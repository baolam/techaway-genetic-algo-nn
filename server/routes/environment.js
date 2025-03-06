const express = require("express");
const Router = express.Router();
const algo = require("../configs/algorithm");
const AlgoHistory = require("../configs/AlgorithmHistory");

let infor = require("../../resources/database/default_environment_infor.json");

Router.get("/", (req, res) => {
  res.json(infor);
});

Router.put("/", (req, res) => {
  console.log("Tiến hành gọi Update");
  algo._socket.emit("update_environment", req.body);
  infor = req.body;
  res.send("Sent a request to server!");
});

Router.get("/result", (req, res) => {
  const folder = req.query.of;
  if (folder === undefined) {
    return res.status(400).json({ message: "Folder is required" });
  }

  const history = new AlgoHistory(folder);
  const env_infor = history.get_environment_infor();
  res.json(env_infor);
});

module.exports = Router;
