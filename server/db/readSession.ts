import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const readSession = () => {
  return fs.readFileSync(__dirname + "/sessions.json", { encoding: "utf-8" });
};

export default readSession;
