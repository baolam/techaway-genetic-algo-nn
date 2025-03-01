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
});

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
  console.log(`Server's address: ${IP_ADDRESS}`);
});
