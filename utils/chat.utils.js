import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import validator from "validator";

export const isUserAllowedInRoom = async (userId, chatId) => {
  const room = await Chat.findById(chatId).populate("allowedUsers");
  if (!room) {
    return false;
  }
  return room.allowedUsers.some((user) => user._id.toString() === userId);
};

export const isUsernameAllowedInRoom = async (username, chatId) => {
  const user = await User.findOne({username: username}, {_id: 1});
  const idString = user._id.toString();
  return isUserAllowedInRoom(idString, chatId);
};

export const validateInput = (input) => {
  if (!input) {
    return false;
  }
  const sanitizedInput = validator.escape(input);
  return sanitizedInput;
};
