const io = require("socket.io-client");

class Algorithm {
  constructor() {
    this._socket = io.connect("http://localhost:5000");
  }

  onEvent() {
    this._socket.on("connect", () => this.#onHandleConnect());
    this._socket.on("disconnect", () => this.#onHandleDisconnect());
    this._socket.on("update_envrionment_status", (result) =>
      this.#onHandleUpdateEnvironmentStatus(result)
    );
    this._socket.on("creature_strategy", (result) =>
      this.#onCreatureStrategy(result)
    );
    this._socket.on("run_algorithm_infor", (result) =>
      this.#onRunAlgoInfor(result)
    );
  }

  #onHandleConnect() {
    console.log("Connected to server");
    let env_infor = require("../../resources/database/default_environment_infor.json");
    this._socket.emit("update_environment", env_infor);
  }

  #onHandleDisconnect() {
    console.log("Stopped server!");
    process.exit(0);
  }

  #onHandleUpdateEnvironmentStatus(result) {
    if (result.success) {
      console.log("Environment status updated successfully");
    } else {
      console.log("Failed to update environment status");
      for (const msg of result.error) {
        console.log(msg);
      }
    }
  }

  #onCreatureStrategy(result) {
    console.log(result);
  }

  #onRunAlgoInfor(result) {
    console.log(result);
  }
}

const algo = new Algorithm();
module.exports = algo;
