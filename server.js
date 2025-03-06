const express = require("express");
const http = require("http");
const ip = require("ip");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path");

const PORT = process.env.PORT || 3001;
const HOST = process.env.HOST || "0.0.0.0";
const IP_ADDRESS = `${ip.address()}:${PORT}`;

const app = express();
const server = http.createServer(app);

// Tiến hành kết nối và duy trì tới server xử lí dữ liệu Python
require("./server/configs/algorithm");

// Xử lí dữ liệu từ user (layout)
app.use(express.static(path.join(__dirname, "resources/build")));
app.use(cors({ origin: "*", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan("short"));

const route = require("./server/routeHandler");
route(app);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "resources/build/index.html"));
});

// Tiến hành quản lí client kết nối qua socket.io
const clientManagement = require("./server/configs/clientManagement");
clientManagement.assignIo(server);

server.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
  console.log(`Server's address: ${IP_ADDRESS}`);
});
