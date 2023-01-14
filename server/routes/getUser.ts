import express from "express";
import { GetUser } from "../db/index.js";

const getUserRoute = express.Router();
const validTypes = { customer: "", employee: "", manager: "" };

getUserRoute.get("/:type/:id", async (req, res) => {
  const { id, type } = req.params;
  if (!(type in validTypes)) {
    res.send({ status: false, msg: "no such type exist" });
    return;
  }

  let getUserFromDb = new GetUser();
  let data;
  try {
    data = await getUserFromDb.getUser(id, type);
    res.send(data);
  } catch (err) {
    res.send({
      status: false,
      msg: "error during perform operation(find user)",
    });
    return;
  }
});

export default getUserRoute;
