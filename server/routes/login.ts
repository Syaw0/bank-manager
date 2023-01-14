import express from "express";
import { hash, Login } from "../db/index.js";
const loginRoute = express.Router();

loginRoute.post("/", async (req, res) => {
  try {
    const { cardId, type, password } = req.body;
    let auth = new Login();
    let data = await auth.authenticate(type, cardId, password);
    res.cookie("session", hash.md5(`${cardId}`), {
      sameSite: "strict",
      secure: true,
      httpOnly: true,
    });
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ status: false, msg: "error during perform method (login)" });
  }
});

export default loginRoute;
