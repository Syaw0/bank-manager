import express from "express";
import getUserRoute from "./getUser.mjs";
import jsRoute from "./js.mjs";
const router = express.Router();

router.use("/js", jsRoute);
router.use("/getUser", getUserRoute);

export default router;
