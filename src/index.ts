const Express = require("express");
import routes from "./routes";
import * as dotenv from "dotenv";
dotenv.config();

const app = Express();
routes(app);

const server = app.listen(3000, () => {
  console.log("Now listening on port ", server.address().port);
});
