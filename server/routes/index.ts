import express from "express";
import addUserRoute from "./addUser.js";
import blockRoute from "./blockAccount.js";
import changeAccessibilityRoute from "./changeAccessibility.js";
import getUserRoute from "./getUser.js";
import getUserListRoute from "./getUserList.js";
import jsRoute from "./js.js";
import loginRoute from "./login.js";
import logoutRoute from "./logout.js";
import makeTransactionRoute from "./makeTransaction.js";
const router = express.Router();

router.use("/assets", jsRoute);
router.use("/getUser", getUserRoute);
router.use("/getUserList", getUserListRoute);
router.use("/addUser", addUserRoute);
router.use("/makeTransaction", makeTransactionRoute);
router.use("/block", blockRoute);
router.use("/changeAccess", changeAccessibilityRoute);
router.use("/auth", loginRoute);
router.use("/logout", logoutRoute);

export default router;
