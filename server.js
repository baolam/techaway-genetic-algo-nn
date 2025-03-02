const express = require("express");
const http = require("http");
const ip = require("ip");
const io = require("socket.io-client");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const IP_ADDRESS = `${ip.address()}:${PORT}`;

const app = express();
const server = http.createServer(app);
const algorithm = io("http://localhost:5000");
const AlgorithmHistory = require("./server/AlgorithmHistory");

algorithm.on("connect", () => {
  console.log("Connected to server!");
  // Tiến hành tải môi trường mặc định
  let environment_infor = require("./resources/database/default_environment_infor.json");
  algorithm.emit("update_environment", environment_infor);
});

algorithm.on("disconnect", () => {
  process.exit(0);
});

algorithm.on("update_environment_status", (data) => {
  if (data.success) {
    console.log("Cập nhật dữ liệu môi trường thành công!");
  } else {
    for (const msg of data.error) {
      console.log(msg);
    }
  }
});

algorithm.on("creature_strategy", (data) => {
  console.log(data);
});

algorithm.on("run_algorithm_infor", (data) => {
  console.log(data);
});

// Viết API nhận dữ liệu được gửi từ giao diện
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/update_environment", (req, res) => {
  algorithm.emit("update_environment", req.body);
});

app.get("/creature/strategy", (req, res) => {
  algorithm.emit("creature_strategy", req.query.id);
  res.send("Sent a request to server!");
});

app.get("/algorithm/result/fitness", (req, res) => {
  const folder = req.query.of;
  if (folder.length === 0) {
    res.status(400).send("Folder is empty!");
  }

  const algorithmatic_history = new AlgorithmHistory(folder);
  const fitness = algorithmatic_history.get_fitness();
  res.send(fitness);
});

app.get("/algorithm/result/environment", (req, res) => {
  const folder = req.query.of;
  if (folder.length === 0) {
    res.status(400).send("Folder is empty!");
  }

  const algorithmatic_history = new AlgorithmHistory(folder);
  res.send(algorithmatic_history.get_environment_infor());
});

app.get("/algorithm/result/creature", (req, res) => {
  const folder = req.query.of;
  if (folder === undefined) {
    return res.status(400).send("Folder is empty!");
  }

  const creature = req.query.creature;
  if (creature === undefined) {
    return res.status(400).send("Creature is undefined!");
  }

  const algorithmatic_history = new AlgorithmHistory(folder);
  const infor = algorithmatic_history.get_creature_infor(creature);
  res.send(infor);
});

app.get("/stop-program", (req, res) => {
  algorithm.emit("stop-program");
  res.send("A program stopped!");
  process.exit(0);
});

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
  console.log(`Server's address: ${IP_ADDRESS}`);
});
