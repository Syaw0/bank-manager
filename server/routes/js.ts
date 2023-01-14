import express from "express";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const jsRoute = express.Router();

jsRoute.get("/:js", (req, res) => {
  const { js } = req.params;
  res.set("X-Content-Type-Options", "nosniff");
  res.set("Content-Type", "text/javascript");
  const path = readFileSync(__dirname + `/../../dist/client/assets/${js}`);
  res.send(path);
});

export default jsRoute;
