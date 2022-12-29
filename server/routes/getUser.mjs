import express from "express";
import GetUser from "../db/index.mjs";

const getUserRoute = express.Router();
const validTypes = { customer: "", employee: "", manager: "" };

getUserRoute.use("/:type/:id", async (req, res) => {
  const { id, type } = req.params;
  if (!(type in validTypes)) {
    res.send({ status: false, msg: "no such type exist" });
    return;
  }

  let getUser = new GetUser();
  let data, con;
  try {
    con = await getUser.connectToDb();
    data = await con.query(`SELECT * FROM ${type}s WHERE id=${id}`);
    if (data.length == 0) {
      throw new Error("no such user in db");
    }
    if (data) {
      res.send({ status: true, msg: "successfully find user", data: data });
    }
  } catch (err) {
    res.send({ status: false, msg: "cant find such user in db" });
    return;
  } finally {
    if (con) {
      return con.end();
    }
  }
});

export default getUserRoute;
