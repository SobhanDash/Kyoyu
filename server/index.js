// const path = require("path");
// require("dotenv").config({ path: path.resolve(__dirname, "./.env") });
const express = require("express");
// const cors = require("cors");
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comment");
const messageRoutes = require("./routes/message");
const connectToMongo = require("./db");
const app = express();
const port = process.env.PORT || 5001;

connectToMongo();
// app.use(cors());

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

if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Server started successfully at port ${port}`);
  }
});
