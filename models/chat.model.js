import mongoose from "mongoose";

const chatRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    matchID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Match",
      required: [true, "can't be blank"],
    },
    allowedUsers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {timestamps: true}
);
const Chat = mongoose.model("Chat", chatRoomSchema);
export default Chat;
