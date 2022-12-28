import express from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import React from "react";
import App from "../../../../client/src/App";

const loginRoute = express.Router();

loginRoute.get("/", (req, res) => {
  let html = ReactDOMServer.renderToString(
    <StaticRouter location={"/login"}>
      <App />
    </StaticRouter>
  );

  console.log(html);
  res.send(`<!DOCTYPE html> `);
});

export default loginRoute;
