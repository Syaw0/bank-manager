import express from "express";
import { GetUserList } from "../db/index.mjs";

const getUserListRoute = express.Router();
const validTypes = { customers: "", employees: "", managers: "" };

getUserListRoute.get("/:type", async (req, res) => {
  const { type } = req.params;
  if (!(type in validTypes)) {
    res.send({ status: false, msg: "selected type is not valid" });
    return;
  }

  let getUserListFromDb = new GetUserList();
  let data;
  try {
    data = await getUserListFromDb.getUserList(type);
    console.log(data);
    if (data.length === 0) {
      throw new Error("no such users exist");
    }
    if (data) {
      res.send({ status: true, msg: "founded", data: data });
    } else {
      throw new Error();
    }
  } catch (err) {
    res.send({ status: false, msg: "cant find users in Db" });
    return;
  }
});

export default getUserListRoute;
