const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const formatMessage = require("./utils/formatMessage.js");

const {
  addPlayer,
  getAllPlayers,
  findPlayerById,
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

    socket.broadcast
      .to(newPlayer.room)
      .emit(
        "message",
        formatMessage("admin", `${newPlayer.playerName} has joined the game`)
      );
    console.log(getAllPlayers(newPlayer.room));
    io.in(newPlayer.room).emit("room", {
      room: newPlayer.room,
      players: getAllPlayers(newPlayer.room),
    });
  });

  socket.on("sendMessage", (message, callback) => {
    const { error, player } = findPlayerById(socket.id);

    if (error) return callback(error.message);

    if (player) {
      io.to(player.room).emit(
        "message",
        formatMessage(player.playerName, message)
      );
      callback();
    }
  });

  socket.on("disconnect", () => {
    console.log("A player disconnected.");

    const disconnectedPlayer = removePlayer(socket.id);

    if (disconnectedPlayer) {
      const { playerName, room } = disconnectedPlayer;
      io.in(room).emit(
        "message",
        formatMessage("Admin", `${playerName} has left!`)
      );

      io.in(room).emit("room", {
        room,
        players: getAllPlayers(room),
      });
    }
  });
});

server.listen(port, () => {
  console.log(`server is running on http://localhost:${port}/`);
});

module.exports = app;
