const express = require("express");
const socket = require("socket.io");
const app = express();

const allRoutes = require("./routes/Routes");

//configurating passport

require("./configurations/PassportConfiguration");

//connectiong to mongodb
require("./configurations/ConnectionToMongoDB");

//adding middlewares
app.use(express.json());

//allowing cros origin
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header(
    "Access-Control-Allow-Headers",

    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
  next();
});

//adding routes
app.use("/api", allRoutes);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log("listening on" + port);
});

const io = socket(server);

io.on("connection", socket => {
  console.log("connected socket ", socket.id);
  socket.on("send message", message => {
    io.sockets.emit("send message server", message);
  });
  socket.on("typing", () => {
    socket.broadcast.emit("typing", null);
  });
  socket.on("stop typing", () => {
    socket.broadcast.emit("stop typing", null);
  });
});
