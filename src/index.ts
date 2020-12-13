const Express = require("express");
import fs from "fs";
import path from "path";

const app = Express();

app.get("/status", (req, res, next) => {
  res.json({
    isLive: true,
  });
});

app.get("*", async (req, res, next) => {
  const { originalUrl } = req;
  await fs.readFile(path.join(__dirname, "..", "dist"));

  res.json({
    url: req.originalUrl,
  });
});

const server = app.listen(3000, () => {
  console.log("Now listening on port ", server.address().port);
});
