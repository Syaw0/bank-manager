import express from "express";
import { ChangeAccess } from "../db/index.js";
const validTypes = { manager: "", employee: "" };

const changeAccessibilityRoute = express.Router();

changeAccessibilityRoute.post("/:type/:id", async (req, res) => {
  const { id, type } = req.params;
  const changeAccValue = req.body;
  console.log(changeAccValue);
  if (!(type in validTypes)) {
    res.send({ status: false, msg: "the type of user is not valid" });
  }
  try {
    let changeAcc = new ChangeAccess();
    const data = await changeAcc.changeAcc(type, id, changeAccValue);
    res.send(data);
  } catch (err) {
    res.send({ status: false, msg: "error during perform method(change acc)" });
  }
});

export default changeAccessibilityRoute;
