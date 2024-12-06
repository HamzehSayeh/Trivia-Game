const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./utils/formatMessage.js");

const {
  addPlayer,
  getAllPlayers,
  getPlayer,
  removePlayer,
} = require("./utils/players.js");
const { error } = require("console");

const app = express();

const port = process.env.PORT || 8080;

const server = http.createServer(app);
const io = socketio(server);

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

io.on("connection", (socket) => {
  console.log(`new user connected`);
  socket.on("join", ({ playerName, room }, callback) => {
    const { error, newPlayer } = addPlayer({ playerName, room, id: socket.id });
    if (error) return callback(error.message);
    callback();

    socket.join(newPlayer.room);

    socket.emit("message", formatMessage("Admin", "Welcome!"));
  });
});

server.listen(port, () => {
  console.log(`server is running on http://localhost:${port}/`);
});

module.exports = app;
