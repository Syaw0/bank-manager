import express from "express";
import addUserRoute from "./addUser.mjs";
import blockRoute from "./blockAccount.mjs";
import getUserRoute from "./getUser.mjs";
import getUserListRoute from "./getUserList.mjs";
import jsRoute from "./js.mjs";
import makeTransactionRoute from "./makeTransaction.mjs";
const router = express.Router();

router.use("/js", jsRoute);
router.use("/getUser", getUserRoute);
router.use("/getUserList", getUserListRoute);
router.use("/addUser", addUserRoute);
router.use("/makeTransaction", makeTransactionRoute);
router.use("/block", blockRoute);

export default router;
