import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  chatId: String,
  text: String,
  user: String,
  createdAt: Date,
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
