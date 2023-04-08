import express from "express";
import mongoose from "mongoose";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";

export const createChat = async (req, res, next) => {
  const {allowedUsers} = req.body;

  try {
    const chat = new Chat({name: "", allowedUsers});
    await chat.save();
    // Add the new room to all allowed users' chatRooms
    await User.updateMany(
      {_id: {$in: allowedUsers}},
      {$addToSet: {chatRooms: chat._id}}
    );
    res.status(201).json({message: "Chat created successfully."});
  } catch (error) {
    res
      .status(500)
      .json({error: "An error occurred while creating/updating the chat."});
  }
};
