import express from "express";
import router from "./router";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

app.use(
  cors({
    origin: "*",
    allowedHeaders: "*",
    methods: ["GET", "POST", "OPTIONS"],
    preflightContinue: false,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.cookies);
  console.log(req.url); // if its ok ok.. if not redirect to login
  next();
});

app.use("/", router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
