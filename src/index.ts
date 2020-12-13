const Express = require("express");
import * as path from "path";
import * as serveStatic from "serve-static";
var parseUrl = require("parseurl");
import * as fs from "fs";

const app = Express();

app.get("/status", (req, res, next) => {
  res.json({
    isLive: true,
  });
});

const staticPath = path.resolve(__dirname, "../", "dist");
const staticMiddleware = serveStatic(staticPath);

app.get("*", (req, res, next) => {
  var originalUrl = parseUrl.original(req);
  var pathFromUrl = parseUrl(req).pathname;

  // make sure redirect occurs at mount
  if (pathFromUrl === "/" && originalUrl.pathname.substr(-1) !== "/") {
    pathFromUrl = "";
  }

  const filePath = path.join(staticPath, pathFromUrl);
  const isIndexHtml =
    !fs.existsSync(filePath) ||
    !fs.statSync(filePath).isFile() ||
    /^\/?index.html$/.test(filePath);

  if (isIndexHtml) {
    fs.readFile(
      path.join(staticPath, "index.html"),
      { encoding: "utf-8" },
      (err, data) => {
        console.log("SENT FILE", err, data);
        res.send(data.replace("{{path}}", filePath));
      }
    );
  } else {
    staticMiddleware(req, res, next);
  }
});

const server = app.listen(3000, () => {
  console.log("Now listening on port ", server.address().port);
});
