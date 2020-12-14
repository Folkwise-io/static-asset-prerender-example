import { Application } from "express";
import ImageBuilder from "../ImageBuilder";

const imageRoute = (app: Application) => {
  app.get("/dynamic/image", (req, res, next) => {
    const { query } = req;
    const p = {
      header: query.header.toString() || "Hello World",
      body1: query.body1.toString() || "This is Mintbean speaking.",
      body2: query.body2.toString() || "Hear us roar.",
    };

    const ib = new ImageBuilder(1200, 627);

    const img = ib
      .background("#13cc13")
      .header(<string>p.header, { x: 200, y: 200 })
      .paragraph(p.body1, { x: 200, y: 300 })
      .paragraph(p.body2, { x: 200, y: 400 })
      .build();

    res.end(img);
  });
};

export default imageRoute;
