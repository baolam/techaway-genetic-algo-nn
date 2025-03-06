const algo = require("./configs/algorithm");

function routeHandler(app) {
  app.use("/api/environment", require("./routes/environment"));
  app.use("/api/creature", require("./routes/creatures"));
  app.use("/api/generations", require("./routes/generations"));
  app.use("/api/algo", require("./routes/algo"));
  app.use("/api/stop-program", (req, res) => {
    algo._socket.emit("stop-program");
    res.send("Sent a request to server!");
  });
}

module.exports = routeHandler;
