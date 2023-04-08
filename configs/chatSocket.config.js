import {Server as socketIO} from "socket.io";
import Message from "../models/message.model.js";
import {authenticateUser} from "../middlewares/auth.middleware.js";
import {
  isUserAllowedInRoom,
  isUsernameAllowedInRoom,
} from "../utils/chat.utils.js";
const configureChatSocket = (server) => {
  const io = new socketIO(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  io.use((socket, next) => {
    socket.userId = socket.handshake.query.userId;
    authenticateUser.socket(socket, next);
  });

  io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("join", async ({chatId, user}) => {
      const userId = socket.decoded_token && socket.decoded_token.id;
      if (userId && user === socket.decoded_token.username) {
        const allowed = await isUserAllowedInRoom(socket.userId, chatId);
        if (allowed) {
          console.log(`${user} joined room ${chatId}`);
          socket.join(chatId);
          const messages = await Message.find({chatId: chatId});
          socket.emit("messages", messages);
          socket.broadcast.to(chatId).emit("user_joined", {user});
        } else {
          socket.emit("error", "You are not allowed to join this room");
        }
      }
    });

    socket.on("message", async (message) => {
      const allowed = await isUsernameAllowedInRoom(
        message.user,
        message.chatId
      );

      if (
        socket.decoded_token &&
        socket.decoded_token.username === message.user &&
        allowed
      ) {
        console.log(`Message received in server: ${message.text}`, message);
        const newMessage = new Message({
          chatId: message.chatId,
          text: message.text,
          user: message.user,
          createdAt: new Date(),
        });
        await newMessage.save();
        // console.log('====================================');
        // console.log();
        // console.log('====================================');
        io.to(message.chatId).emit("message", newMessage);
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

export default configureChatSocket;
