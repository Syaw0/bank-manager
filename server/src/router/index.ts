import express from "express";
import loginRoute from "./login/index";

const router = express.Router();

router.use("/login", loginRoute);

router.get("*", (req, res) => {
  res.send("ERROR 404");
});

export default router;
