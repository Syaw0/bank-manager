import express from "express";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const jsRoute = express.Router();

jsRoute.get("/", (req, res) => {
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Type", "text/javascript");
  const js = readFileSync(
    __dirname + "/../../dist/client/assets/index.bd99d903.js"
  );
  res.send(js);
});

export default jsRoute;
