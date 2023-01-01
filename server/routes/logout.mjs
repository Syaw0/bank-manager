import express from "express";
import { Logout } from "../db/index.mjs";

const logoutRoute = express.Router();

logoutRoute.get("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const cookies = req.cookies;
    if (cookies.session == null) {
      res.redirect("/login");
      return;
    }
    let logout = new Logout();

    let result = logout.loggingOut(cookies.session, id);
    res.send(result);
  } catch (err) {
    res.send({ status: false, msg: "error during perform method(logout)" });
  }
});

export default logoutRoute;
