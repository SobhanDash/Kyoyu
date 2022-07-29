const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comment");
const messageRoutes = require("./routes/message");
const connectToMongo = require("./db");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);
const port = process.env.PORT || 5000;

connectToMongo();
app.use(cors());

require("./models/User");
require("./models/Post");
require("./models/Comment");
require("./models/Conversation");
require("./models/Message");

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/message", messageRoutes);

let users = [];

const addUser = (userId, socketId) => {
  // console.log(users.length);
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
  // console.log(users);
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log(`A user with socket id ${socket.id} is connected!`);

  // Take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    // console.log("users");
    let myusers = [];
    for (let i = 0; i < users.length; i++) {
      myusers.push(users[i].userId);
    }
    io.emit("getUsers", myusers);
  });

  // send and get message
  socket.on(
    "sendMessage",
    ({ _id, conversation, sender, receiver, text, createdAt, updatedAt }) => {
      let myreceiver = getUser(receiver._id);
      // console.log(receiver._id);
      if (myreceiver) {
        io.to(myreceiver.socketId).emit("getMessage", {
          _id,
          conversation,
          sender,
          receiver,
          text,
          createdAt,
          updatedAt,
        });
      }
    }
  );

  // Disconnection
  socket.on("disconnect", () => {
    console.log("disconnected");
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

server.listen(port, (error) => {
  if (error) console.log(error);
  console.log(`Server started on port ${port}`);
});

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// app.listen(port, (err) => {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(`Server started successfully at port ${port}`);
//   }
// });
