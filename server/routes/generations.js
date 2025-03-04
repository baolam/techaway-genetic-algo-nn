const express = require("express");
const Router = express.Router();
const AlgoHistory = require("../configs/AlgorithmHistory");

Router.get("/fitness", (req, res) => {
  const folder = req.query.of;
  if (folder === undefined) {
    return res.status(400).send({ message: "Folder is required" });
  }

  const history = new AlgoHistory(folder);
  const fitness = history.get_fitness();
  res.json({ fitness });
});

module.exports = Router;
