const express = require("express");
const http = require("http");
const cors = require("cors");

const { Server } = require("socket.io");

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("user connected", socket.id);
  socket.on("join_room", (room) => {
    socket.join(room);
    console.log("user", socket.id, "joined", room);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("typing", ({ username, room }) => {
    socket.to(room).emit("user_typing", username);
  });
});

server.listen(3010, () => {
  console.log("server running on port 3010");
});
