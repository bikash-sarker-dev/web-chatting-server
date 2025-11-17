const express = require("express");
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

server.listen(3010, () => {
  console.log("server running on port 3010");
});
