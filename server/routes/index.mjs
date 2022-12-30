import express from "express";
import addUserRoute from "./addUser.mjs";
import blockRoute from "./blockAccount.mjs";
import changeAccessibilityRoute from "./changeAccessibility.mjs";
import getUserRoute from "./getUser.mjs";
import getUserListRoute from "./getUserList.mjs";
import jsRoute from "./js.mjs";
import loginRoute from "./login.mjs";
import makeTransactionRoute from "./makeTransaction.mjs";
const router = express.Router();

router.use("/js", jsRoute);
router.use("/getUser", getUserRoute);
router.use("/getUserList", getUserListRoute);
router.use("/addUser", addUserRoute);
router.use("/makeTransaction", makeTransactionRoute);
router.use("/block", blockRoute);
router.use("/changeAccess", changeAccessibilityRoute);
router.use("/auth", loginRoute);

export default router;
