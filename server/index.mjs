import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import router from "./routes/index.mjs";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import checkSession from "./util/checkSession.mjs";
import { GetUser } from "./db/index.mjs";
import { urlAccess } from "./util/urlAccess.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isTest = process.env.VITEST;

process.env.MY_CUSTOM_SECRET = "API_KEY_qwertyuiop";

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production",
  hmrPort
) {
  const resolve = (p) => path.resolve(__dirname, p);
  const indexProd = isProd
    ? fs.readFileSync(
        resolve(__dirname + "/../dist/client/index.html"),
        "utf-8"
      )
    : "";

  const app = express();
  app.use(
    cors({
      allowedHeaders: "*",
      credentials: true,
      methods: ["GET", "POST", "OPTIONS"],
      origin: "*",
      preflightContinue: false,
      optionsSuccessStatus: 204,
    })
  );
  app.use(cookieParser());
  app.use(bodyParser.json());

  /**
   * @type {import('vite').ViteDevServer}
   */
  let vite;
  if (!isProd) {
    vite = await (
      await import("vite")
    ).createServer({
      root,
      logLevel: isTest ? "error" : "info",
      server: {
        middlewareMode: true,
        watch: {
          // During tests we edit the files too fast and sometimes chokidar
          // misses change events, so enforce polling for consistency
          usePolling: true,
          interval: 100,
        },
        hmr: {
          port: hmrPort,
        },
      },
      appType: "custom",
    });
    // use vite's connect instance as middleware
    app.use(vite.middlewares);
  } else {
    app.use((await import("compression")).default());
    app.use(
      (await import("serve-static")).default(resolve("/../dist/client"), {
        index: false,
      })
    );
  }

  app.use("/", async (req, res, next) => {
    if (req.headers["user-agent"].search("Postman") != -1) {
      next();
      return;
    }
    //TODO when send some important information dont forget to set cache settings of responses

    // TODO:implement the session storage for those that want to do not use cookies
    //! if user agent does not support cookies this has huge bug for application
    //! for this we must check cookie support in client and then if not
    //! we must implement the session storage For that
    if (req.originalUrl.search("/assets/") != -1) {
      next();
      return;
    }
    const cookie = req.cookies;
    if (!cookie.session) {
      if (req.originalUrl != "/login" && req.originalUrl != "/auth") {
        res.redirect("/login");
        return;
      }
    } else {
      const result = checkSession(cookie.session);
      if (result.status) {
        const { type, id } = result.data;
        let getUserFromDb = new GetUser();
        // * here i want to use proxy to use cache data
        // * and trigger a event to update cache when some methods calls
        // * like block or unblock
        let data = await getUserFromDb.getUser(id, type);
        if (req.originalUrl == "/whoami") {
          data.data[0]["type"] = type;
          res.send(data);
          return;
        }
        let hasUserAccess = true;
        Object.keys(urlAccess).forEach((ua) => {
          if (req.originalUrl.search(ua) != -1) {
            if (
              data.data[0][urlAccess[ua]] == 0 ||
              data.data[0][urlAccess[ua]] == null
            ) {
              hasUserAccess = false;
            }
          }
        });

        if (
          data.data[0].block === 1 &&
          req.originalUrl != "/auth" &&
          req.originalUrl != "/login" &&
          req.originalUrl.search("/logout/") == -1 &&
          req.originalUrl != "/dash"
        ) {
          hasUserAccess = false;
        }
        if (!hasUserAccess) {
          const validUrls = {
            [`/getUser/${type}/${id}`]: "",
            [`/dash/${type}s/${id}`]: "",
          };
          if (req.originalUrl in validUrls) {
            next();
            return;
          }

          if (req.originalUrl != "/dash") {
            res.redirect("/dash");
            return;
          }
        }

        if (req.originalUrl != "/dash" && req.originalUrl == "/login") {
          res.redirect("/dash");
          return;
        }
      } else {
        if (req.originalUrl != "/login" && req.originalUrl != "/auth") {
          res.redirect("/login");
          return;
        }
      }
    }

    next();
  });

  app.use("/", router);

  app.use("*", async (req, res) => {
    try {
      const url = req.originalUrl;
      let template, render;
      if (!isProd) {
        // always read fresh template in dev
        template = fs.readFileSync(
          resolve(__dirname + "/../index.html"),
          "utf-8"
        );
        template = await vite.transformIndexHtml(url, template);
        render = (
          await vite.ssrLoadModule(__dirname + "/../src/entry-server.tsx")
        ).render;
      } else {
        template = indexProd;
        // @ts-ignore
        render = (await import(__dirname + "/../dist/server/entry-server.mjs"))
          .render;
      }

      const context = {};
      const appHtml = render(url);

      if (context.url) {
        // Somewhere a `<Redirect>` was rendered
        return res.redirect(301, context.url);
      }

      let html = template.replace(`<!--app-html-->`, appHtml);

      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      !isProd && vite.ssrFixStacktrace(e);
      console.log(e.stack);
      res.status(500).end(e.stack);
    }
  });

  return { app, vite };
}

if (!isTest) {
  createServer().then(({ app }) =>
    app.listen(5173, () => {
      console.log("http://localhost:5173");
    })
  );
}
