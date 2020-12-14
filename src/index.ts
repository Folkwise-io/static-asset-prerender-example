const Express = require("express");
import * as path from "path";
import * as serveStatic from "serve-static";
var parseUrl = require("parseurl");
import * as fs from "fs";
import templateHtml from "./htmlUtil";
import ImageBuilder from "./ImageBuilder";

const app = Express();

app.get("/dynamic/status", (req, res, next) => {
  res.json({
    isLive: true,
  });
});

const staticPath = path.resolve(__dirname, "../", "dist");
const staticMiddleware = serveStatic(staticPath);

app.get("/dynamic/image", (req, res, next) => {
  const { query } = req;
  const p = {
    header: query.header || "Hello World",
    body1: query.body1 || "This is Mintbean speaking.",
    body2: query.body2 || "Hear us roar.",
  };

  const ib = new ImageBuilder(1200, 627);

  const img = ib
    .background("#13cc13")
    .header(p.header, { x: 200, y: 200 })
    .paragraph(p.body1, { x: 200, y: 300 })
    .paragraph(p.body2, { x: 200, y: 400 })
    .build();

  res.end(img);
});

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
    const html = templateHtml(
      {},
      {
        basePath: "http://ba511a3f5717.ngrok.io",
        defaultImagePath: "/image.jpg",
      }
    );
    res.send(html);
  } else {
    staticMiddleware(req, res, next);
  }
});

const server = app.listen(3000, () => {
  console.log("Now listening on port ", server.address().port);
});
