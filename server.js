const express = require("express");
const http = require("http");
const ip = require("ip");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const IP_ADDRESS = `${ip.address()}:${HOST}`;

const app = express();
const server = http.createServer(app);

server.listen(PORT, HOST, () => {
  console.log(`Server is listening on port: ${PORT}`);
  console.log(`Server's address: ${IP_ADDRESS}`);
});
