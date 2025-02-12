const express = require("express");
const http = require("http");
const ip = require("ip");
const ws = require("ws");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const IP_ADDRESS = `${ip.address()}:${PORT}`;

const app = express();
const server = http.createServer(app);

const wss = new ws.Server({ port: 8080 });
wss.on("connection", (socket, req) => {
  console.log(`Algorithm ready!`);
  setTimeout(() => {
    socket.send("STOP");
  }, 10000);
});

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
  console.log(`Server's address: ${IP_ADDRESS}`);
});
