const path = require("path");
const fs = require("fs");

class AlgorithmHistory {
  constructor(saved_folder) {
    this.__saved_path = path.join("./resources/database", saved_folder);
    this.__possible = true;

    if (!fs.existsSync(this.__saved_path)) {
      console.log("Folder chưa tồn tại!");
      this.__possible = false;
    }
  }

  get_fitness() {
    if (!this.__possible) {
      return [];
    }

    const overall = require("../" +
      path.join(this.__saved_path, "overall.json"));
    const generations = overall.generations;

    const fitness = [];
    for (let i = 1; i <= generations; i++) {
      const score = require("../" +
        path.join(this.__saved_path, i.toString() + ".json")).best_fitness;
      fitness.push(score);
    }

    return fitness;
  }

  get_environment_infor() {
    if (!this.__possible) {
      return {};
    }
    const overall = require("../" +
      path.join(this.__saved_path, "overall.json"));
    const environment = overall.environment;
    return environment;
  }
}

module.exports = AlgorithmHistory;
