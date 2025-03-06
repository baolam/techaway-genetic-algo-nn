const io = require("socket.io");

class ClientManagement {
  constructor() {
    this._io = null;
  }

  assignIo(srv) {
    this._io = new io.Server(srv, { cors: { origin: "*" } });
    this.#onManagement();
  }

  #onManagement() {
    if (this._io === null) return;
    this._io.on("connection", (socket) => {
      console.log("a new client connected");
      console.log(socket.id);
    });
  }
}

const clientManagement = new ClientManagement();
module.exports = clientManagement;
