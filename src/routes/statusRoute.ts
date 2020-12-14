import { Application } from "express";

const statusRoute = (app: Application) => {
  app.get("/dynamic/status", (req, res, next) => {
    res.json({
      isLive: true,
    });
  });
};

export default statusRoute;
