// Model for Post
const mongoose = require("mongoose");
const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    image: {
      type: String,
      required: true,
    },
    caption: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: true }
);
const Post = mongoose.model("Post", PostSchema)
module.exports = Post;
