const Express = require("express");
import * as path from "path";
import * as serveStatic from "./serve-static/index.js";

const app = Express();

app.get("/status", (req, res, next) => {
  res.json({
    isLive: true,
  });
});

app.get("*", serveStatic(path.resolve(__dirname, "../", "dist")));

const server = app.listen(3000, () => {
  console.log("Now listening on port ", server.address().port);
});
