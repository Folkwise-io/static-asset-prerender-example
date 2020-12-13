const Express = require("express");

const app = Express();

app.get("/status", (req, res, next) => {
  res.json({
    isLive: true,
  });
});

const server = app.listen(3000, () => {
  console.log("Now listening on port ", server.address().port);
});
