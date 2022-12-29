import express from "express";
import getUserRoute from "./getUser.mjs";
import getUserListRoute from "./getUserList.mjs";
import jsRoute from "./js.mjs";
const router = express.Router();

router.use("/js", jsRoute);
router.use("/getUser", getUserRoute);
router.use("/getUserList", getUserListRoute);

export default router;
