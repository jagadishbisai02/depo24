require("dotenv").config();
const authRoute = require("./routes/userRoute");
const messageRoute = require("./routes/message");
const cookieParser = require("cookie-parser");
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const socket = require("socket.io");

const PORT = process.env.PORT || 8080;

mongoose
  .connect("mongodb://localhost:27017/dynamicChat", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongoose conneted");
  })
  .catch((error) => {
    console.log(error.message);
  });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/messages", messageRoute);

app.get("/", (req, res) => {
  res.send("hello world !!");
});
const server = app.listen(PORT, () => {
  console.log("server is running");
});

// const io = socket(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     credentials: true,
//   },
// });

// global.onlineUsers = new Map();
// io.on("connection", (socket) => {
//   global.chatSocket = socket;
//   socket.on("add-user", (userId) => {
//     onlineUsers.set(userId, socket.id);
//   });

//   socket.on("send-msg", (data) => {
//     const sendUserSocket = onlineUsers.get(data.to);
//     if (sendUserSocket) {
//       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
//     }
//   });
// });
