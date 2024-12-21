const express = require('express');
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const { disconnect } = require('process');
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function (socket) {
  socket.on("send-location",function(data){
    io.emit("receive-location",{id:socket.id,...data})
  });
 socket.on("disconnect",function(){
  io.emit("user-disconnecteed",socket.id);
 });
});

app.get('/', function (req, res) {
  res.render("index");
});

const PORT = 3000;
server.listen(PORT, function() {
  console.log(`Server is running on port ${PORT}`);
});
