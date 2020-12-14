import { Application } from "express";
import statusRoute from "./statusRoute";
import imageRoute from "./imageRoute";
import staticRoute from "./staticRoute";
import resourceRoutes from "./resourceRoutes";

export default (app: Application) => {
  [statusRoute, imageRoute, resourceRoutes, staticRoute].forEach((route) =>
    route(app)
  );
};
