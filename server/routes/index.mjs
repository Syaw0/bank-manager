import express from "express";
import jsRoute from "./js.mjs";
const router = express.Router();

router.use("/js", jsRoute);

export default router;
