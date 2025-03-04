const express = require("express");
const Router = express.Router();
const algo = require("../configs/algorithm");
const AlgoHistory = require("../configs/AlgorithmHistory");

Router.get("/strategy", (req, res) => {
  const id = req.query.id;
  if (id === undefined) {
    return res.status(400).send({ message: "Missing id parameter" });
  }
  algo._socket.emit("creature_strategy", id);
  res.send("Sent a request to server!");
});

Router.get("/result", (req, res) => {
  const folder = req.query.of;
  if (folder === undefined) {
    return res.status(400).send({ message: "Missing folder parameter" });
  }
  const creature = req.query.creature;
  if (creature === undefined) {
    return res.status(400).send({ message: "Missing creature parameter" });
  }

  const history = new AlgoHistory(folder);
  const infor = history.get_creature_infor(creature);
  res.json(infor);
});

module.exports = Router;
