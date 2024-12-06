const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();

const port = process.env.PORT || 8080;

const server = http.createServer(app);
const io = socketio(server);

const publicDirectoryPath = path.join(__dirname, "../public");
app.use(express.static(publicDirectoryPath));

io.on("connection", () => {
  console.log(`new user connected`);
});

server.listen(port, () => {
  console.log(`server is running on http://localhost:${port}/`);
});

module.exports = app;
