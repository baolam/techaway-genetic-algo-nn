const express = require("express");
const Router = express.Router();

Router.get("/", (req, res) => {
  const genetic_algorithm = require("../../resources/database/default_genetic_algorithm_infor.json");
  const weight_fitness = require("../../resources/database/default_weight_fitness.json");
  const general_config = require("../../resources/database/general_config.json");
  const infor = {
    ...genetic_algorithm,
    ...weight_fitness,
    ...general_config,
  };
  res.json(infor);
});

module.exports = Router;
