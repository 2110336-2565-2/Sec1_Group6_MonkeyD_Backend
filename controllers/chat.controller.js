import express from "express";
import mongoose from "mongoose";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";

export const createChat = async (req, res, next) => {
  try {
    const {allowedUsers, matchID} = req.body;
    const chat = new Chat({name: "", allowedUsers, matchID});
    await chat.save();
    // Add the new room to all allowed users' chatRooms
    await User.updateMany(
      {_id: {$in: allowedUsers}},
      {$addToSet: {chatRooms: chat._id}}
    );
    res.status(201).json({message: "Chat created successfully."});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
};
export const toggleNotiChat = async (req, res, next) => {
  const chat_id = req.headers.chat_id;
  const user_id = req.headers.user_id;
  let user;
  try {
    user = await User.findById(user_id);
    if (user == null) {
      return res.status(404).send({message: "Cannot find user"});
    }
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
  const index = user.muteList.indexOf(chat_id);
  if (index !== -1) {
    user.muteList.splice(index, 1);
    res.send("Turn on notification for this chat");
  }
  else{
    user.muteList.push(chat_id);
    res.send("Turn off notification for this chat");
  }
  user.save();
};