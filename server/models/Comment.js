const mongoose = require("mongoose");
const { Schema } = mongoose;

const CommentSchema = new Schema({
  comment: {
    type: String,
    required: true,
  },
  likes: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  post: {
    type: Schema.Types.ObjectId,
    ref: "Post",
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: Number,
  updatedAt: Number,
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
