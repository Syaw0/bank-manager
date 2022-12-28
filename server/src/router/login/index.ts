import express from "express";

const loginRoute = express.Router();

loginRoute.get("/", (req, res) => {
  res.send(`<!DOCTYPE html> `);
});

export default loginRoute;
