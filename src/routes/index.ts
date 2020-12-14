import { Application } from "express";
import statusRoute from "./statusRoute";
import imageRoute from "./imageRoute";
import staticRoute from "./staticRoute";

export default (app: Application) => {
  [statusRoute, imageRoute, staticRoute].forEach((route) => route(app));
};
