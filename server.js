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

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
  console.log(`Server's address: ${IP_ADDRESS}`);
});
