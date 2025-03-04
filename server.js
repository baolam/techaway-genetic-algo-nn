const express = require("express");
const http = require("http");
const ip = require("ip");

const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || "0.0.0.0";
const IP_ADDRESS = `${ip.address()}:${PORT}`;

const app = express();
const server = http.createServer(app);

// Tiến hành kết nối và duy trì tới server xử lí dữ liệu Python
require("./server/configs/algorithm");

// Xử lí dữ liệu từ user (layout)
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const route = require("./server/routeHandler");
route(app);

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
  console.log(`Server's address: ${IP_ADDRESS}`);
});
