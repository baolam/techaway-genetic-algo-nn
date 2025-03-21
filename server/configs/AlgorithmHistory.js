const path = require("path");
const fs = require("fs");
const scope =
  require("../../resources/database/general_config.json").num_saved_generation;

class AlgorithmHistory {
  constructor(saved_folder) {
    this.__saved_path = this.#__getPath(saved_folder, true);
    this.__possible = true;

    if (!fs.existsSync(this.__saved_path)) {
      console.log(`Folder ${saved_folder} chưa tồn tại!`);
      console.log(`Đường dẫn: ${this.__saved_path}`);
      this.__possible = false;
    } else {
      this.#__processAncestor();
    }
  }

  #__getPath(infor, isSavedPath = false) {
    if (isSavedPath) {
      return path.join(__dirname, "../../resources/database", infor);
    }
    return path.join(this.__saved_path, infor);
  }

  #__processAncestor() {
    const ancestor_file = this.#__getPath("ancestors.json");
    if (fs.existsSync(ancestor_file)) return;

    const overall = require(this.#__getPath("overall.json"));
    const generations = overall.generations;

    const ancestors = {};

    /// Chỉ lấy tổ tiên theo scope
    for (let i = generations - scope; i <= generations; i++) {
      const generation = require(this.#__getPath(i.toString() + ".json"));
      const population = generation.final_population;
      const infors = {};
      for (let j = 1; j <= Object.keys(population).length; j++) {
        const ancestors = population[j.toString()].ancestors;
        if (ancestors.length === 0) continue;
        infors[j.toString()] = {
          // Là con được tạo bởi cha mẹ ở thế hệ ...
          generation: population[j.toString()].generation_number,
          ancestors,
        };
      }
      ancestors[i.toString()] = infors;
    }

    fs.writeFileSync(ancestor_file, JSON.stringify(ancestors, null, 2));
  }

  get_fitness() {
    if (!this.__possible) {
      return [];
    }

    const overall = require(this.#__getPath("overall.json"));
    return overall.fitness;
  }

  get_total() {
    if (!this.__possible) {
      return 0;
    }

    const overall = require(this.#__getPath("overall.json"));
    return overall.generations;
  }

  get_environment_infor() {
    if (!this.__possible) {
      return {};
    }
    const overall = require(this.#__getPath("overall.json"));
    const environment = overall.environment;
    return environment;
  }

  #_accessAncestor(creature_id, generation_code, ancestor_infor) {
    try {
      const generation = ancestor_infor[String(generation_code)];
      const infor = generation[String(creature_id)];
      return infor;
    } catch {
      return {};
    }
  }

  #_retrieveAncestor(
    creature_infor,
    generation_code,
    range,
    ancestor_infor,
    visited = {}
  ) {
    if (generation_code < range[0] || generation_code > range[1]) {
      return {};
    }

    if (visited[creature_infor.id]) return {};

    const ancestors = creature_infor.ancestors;
    if (ancestors === undefined) return {};

    const parent1 = this.#_accessAncestor(
      ancestors[0],
      generation_code,
      ancestor_infor
    );
    const parent2 = this.#_accessAncestor(
      ancestors[1],
      generation_code,
      ancestor_infor
    );

    const results = {
      [ancestors[0]]: this.#_retrieveAncestor(
        parent1,
        parent1.generation - 1,
        range,
        ancestor_infor
      ),
      [ancestors[1]]: this.#_retrieveAncestor(
        parent2,
        parent2.generation - 1,
        range,
        ancestor_infor
      ),
      generation: generation_code,
    };

    return results;
  }

  get_ancestor_creature(creature_id) {
    const ancestor_infor = require(this.#__getPath("ancestors.json"));
    /// Tiến hành lấy từ thế hệ cuối quay ngược lại thế hệ sau
    const generations = Object.keys(ancestor_infor);
    const range = [
      parseInt(generations[0]),
      parseInt(generations[generations.length - 1]),
    ];
    const creature = this.#_accessAncestor(
      creature_id,
      range[1],
      ancestor_infor
    );
    if (creature) {
      return this.#_retrieveAncestor(creature, range[1], range, ancestor_infor);
    }
    return {};
  }

  get_creature_infor(creature_id) {
    const ancestors = this.get_ancestor_creature(creature_id);
    const overall = require(this.#__getPath("overall.json"));
    const generations = overall.generations;
    const final_generation = require(this.#__getPath(
      String(generations) + ".json"
    ));
    const creature = final_generation.final_population[creature_id];
    const results = {
      ancestors,
      creature,
    };

    return results;
  }
}

module.exports = AlgorithmHistory;
