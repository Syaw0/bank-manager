import express from "express";
import { Login } from "../db/index.mjs";
const loginRoute = express.Router();

loginRoute.post("/", async (req, res) => {
  try {
    const { cardId, type, password } = req.body;
    let auth = new Login();
    let data = await auth.authenticate(type, cardId, password);
    res.send(data);
  } catch (err) {
    res.send({ status: false, msg: "error during perform method (login)" });
  }
});

export default loginRoute;
