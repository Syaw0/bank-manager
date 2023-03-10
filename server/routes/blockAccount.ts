import express from "express";
import { BlockAccount } from "../db/index.js";

const blockRoute = express.Router();

blockRoute.post("/:type/:id", async (req, res) => {
  const { type, id } = req.params;
  const { isBlocked } = req.body;

  try {
    const blockUsers = new BlockAccount();
    const data = await blockUsers.blockAccount(type, id, isBlocked);
    res.send(data);
  } catch (err) {
    console.log(err);
    res.send({ status: false, msg: "error during perform method(blocking)" });
  }
});

export default blockRoute;
