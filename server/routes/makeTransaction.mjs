import express from "express";
import { MakeTransaction } from "../db/index.mjs";

const makeTransactionRoute = express.Router();

makeTransactionRoute.post("/", async (req, res) => {
  const transactionData = req.body;

  try {
    let makeTransaction = new MakeTransaction();
    const data = await makeTransaction.performTransaction(transactionData);
    res.send(data);
  } catch (err) {
    res.send({ status: false, msg: "error during call Methods" });
  }
});

export default makeTransactionRoute;
