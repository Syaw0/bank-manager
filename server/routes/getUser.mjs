import express from "express";
import { GetUser } from "../db/index.mjs";

const getUserRoute = express.Router();
const validTypes = { customer: "", employee: "", manager: "" };

getUserRoute.use("/:type/:id", async (req, res) => {
  const { id, type } = req.params;
  if (!(type in validTypes)) {
    res.send({ status: false, msg: "no such type exist" });
    return;
  }

  let getUserFromDb = new GetUser();
  let data;
  try {
    data = await getUserFromDb.getUser(id, type);
    if (data.length == 0) {
      throw new Error("no such user in db");
    }
    if (data) {
      res.send({ status: true, msg: "successfully find user", data: data });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.send({ status: false, msg: "cant find such user in db" });
    return;
  }
});

export default getUserRoute;
