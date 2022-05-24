const mongoose = require("mongoose");
const { Schema } = mongoose;

const MessageSchema = new Schema(
  {
    conversation: {
      type: mongoose.Types.ObjectId,
      ref: "Conversation",
    },
    text: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiver: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    createdAt: Number,
    updatedAt: Number,
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
