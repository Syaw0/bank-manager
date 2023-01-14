import express from "express";
import { GetUserList } from "../db/index.js";

const getUserListRoute = express.Router();
const validTypes = { customers: "", employees: "", managers: "" };

getUserListRoute.get("/:type/", async (req, res) => {
  const { sort } = req.query;
  const { type } = req.params;
  if (!(type in validTypes)) {
    res.send({ status: false, msg: "selected type is not valid" });
    return;
  }

  let getUserListFromDb = new GetUserList();
  let data;
  try {
    data = await getUserListFromDb.getUserList(type, sort);
    res.send(data);
  } catch (err) {
    res.send({
      status: false,
      msg: "error during perform operation(getUserList)",
    });
    return;
  }
});

export default getUserListRoute;
