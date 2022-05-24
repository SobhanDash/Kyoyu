const mongoose = require("mongoose");
const { Schema } = mongoose;

const ConversationSchema = new Schema(
  {
    recipients: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    text: String,
    media: Array,
    createdAt: Number,
    updatedAt: Number,
  },
  {
    timestamps: true,
  }
);

const Conversation = mongoose.model("Conversation", ConversationSchema);
module.exports = Conversation;
