const express = require("express");
const path = require("path");
const fs = require("fs");
const Router = express.Router();
const AlgoHistory = require("../configs/AlgorithmHistory");

const databasePath = path.join(__dirname, "../../resources/database");

Router.get("/fitness", (req, res) => {
  const folder = req.query.of;
  if (folder === undefined) {
    return res.status(400).send({ message: "Folder is required" });
  }

  const history = new AlgoHistory(folder);
  const fitness = history.get_fitness();
  res.json({ fitness });
});

Router.get("/situation", (req, res) => {
  const files = fs.readdirSync(databasePath, { withFileTypes: true });
  const directories = files.filter((file) => file.isDirectory());
  res.json({ directories });
});

Router.get("/total", (req, res) => {
  const folder = req.query.of;
  if (folder === undefined || folder === null || folder === "") {
    return res.status(400).send({ message: "Folder is required" });
  }

  const history = new AlgoHistory(folder);
  const generations = history.get_total();
  res.json({ generations });
});

module.exports = Router;
