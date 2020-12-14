import { Application } from "express";
import UserService from "../services/UserService";
import MeetService from "../services/MeetService";

const statusRoute = (app: Application) => {
  app.get("/api/user/:id", async (req, res, next) => {
    const userService = new UserService();
    const user = await userService.byId(+req.params.id);

    if (!user) {
      res.status(404).json({
        message: "User not found",
      });
    } else {
      res.json(user);
    }
  });

  app.get("/api/meet/:id", async (req, res, next) => {
    const meetService = new MeetService();
    const meet = await meetService.byId(+req.params.id);

    if (!meet) {
      res.status(404).json({
        message: "Meet not found",
      });
    } else {
      res.json(meet);
    }
  });
};

export default statusRoute;
