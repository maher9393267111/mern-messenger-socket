require("dotenv").config();
const cors = require("cors");
const express = require("express");
const socket = require("socket.io");
const morgan = require("morgan");
const path = require("path");
 //const { Server } = require("socket.io");
const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
const connect = require("./config/db");

const userController = require("./controller/user");
const chatsController = require("./controller/chats");

app.use("/api/", userController);
app.use("/api/chats/", chatsController);



app.use(express.static(path.join(__dirname, "../Client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../Client/dist/index.html"));
});


//app.use("/message", messageController);

const PORT = process.env.PORT || 5000;
let server = app.listen(PORT, async (req, res) => {
  try {
    await connect();
  } catch (err) {
    console.log(err.message);
  }
  console.log(`Listening on ${PORT}`);
});
const io = socket(server, {
  pingTimeout: 6000,
  cors: {
    "Access-Control-Allow-Origin": "*",
  //  origin: "",
    // credentials: true,
  },
});
io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
  });

  socket.on("new message", (recievedMessage) => {
    var chat = recievedMessage.chat;
    chat.users.forEach((user) => {
      if (user == recievedMessage.sender._id) return;
      socket.in(user).emit("message recieved", recievedMessage);
    });
  });

  socket.off("setup", () => {
    socket.leave(userData._id);
  });
});
