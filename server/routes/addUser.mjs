import express from "express";
import { AddUser, GetUser } from "../db/index.mjs";

const addUserRoute = express.Router();
const validTypes = { customer: "", employee: "", manager: "" };

addUserRoute.post("/:type", async (req, res) => {
  const { type } = req.params;
  const addingData = req.body;
  if (!(type in validTypes)) {
    res.send({ status: false, msg: "types is invalid" });
    return;
  }

  try {
    // first let go and see if we have any other user with same info?
    let getUser = new GetUser();
    const isUserExist = await getUser.getUserByCardId(addingData.cardId, type);
    if (isUserExist.status) {
      res.send({ status: false, msg: "user with same cardId Exist..." });
      return;
    }
    if (isUserExist.error) {
      throw new Error();
    }

    let addUserToDb = new AddUser();
    const data = await addUserToDb.addUser(type, addingData);
    res.send(data);
  } catch (err) {
    res.send({ status: false, msg: "error during perform action(addUser)" });
  }
});

export default addUserRoute;
