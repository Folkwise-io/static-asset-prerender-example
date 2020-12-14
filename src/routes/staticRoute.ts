import { Application } from "express";
import * as path from "path";
import * as serveStatic from "serve-static";
var parseUrl = require("parseurl");
import * as fs from "fs";
import templateHtml from "../htmlUtil";
import ImageBuilder from "../ImageBuilder";

const staticPath = path.resolve(__dirname, "..", "..", "dist");
const staticMiddleware = serveStatic(staticPath);

const staticRoute = (app: Application) => {
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
};

export default staticRoute;
