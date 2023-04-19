import express from "express";
import mongoose from "mongoose";
import Match from "../models/match.model.js";
import Chat from "../models/chat.model.js";
import User from "../models/user.model.js";
import Car from "../models/car.model.js";
import {getImageUrl} from "../utils/gcs.utils.js";

export const createMatch = (req, res, next) => {
  const {
    carID,
    lessorID,
    renterID,
    status,
    pickupLocation,
    pickUpDateTime,
    returnLocation,
    returnDateTime,
    price,
  } = req.body.match;

  if (renterID == lessorID)
    return res.send({message: "You can't rent your car."});

  const match = new Match();
  if (carID) match.carID = carID;
  if (status) match.status = status;
  if (lessorID) match.lessorID = lessorID;
  if (renterID) match.renterID = renterID;
  if (pickupLocation) match.pickupLocation = pickupLocation;
  if (pickUpDateTime) match.pickUpDateTime = new Date(pickUpDateTime);
  if (returnLocation) match.returnLocation = returnLocation;
  if (returnDateTime) match.returnDateTime = new Date(returnDateTime);
  if (price) match.price = price;

  match
    .save()
    .then(function () {
      return res.json({match: match.toAuthJSON()});
    })
    .catch(function (error) {
      console.log(error);
      if (error.code === 11000) {
        return res.status(400).send({
          error: "something already exists",
        });
      }
      console.log(error);
      next(error);
    });
};

export const getMatches = async (req, res, next) => {
  let condition = {};
  if (req.query.status) {
    condition.status = req.query.status;
  }
  if (req.query.carID) {
    condition.carID = req.query.carID;
  }
  if (req.query.lessorID) {
    condition.lessorID = req.query.lessorID;
  }
  if (req.query.renterID) {
    condition.renterID = req.query.renterID;
  }

  try {
    let matches = await Match.find(condition);
    const sendMatches = matches.map((e) => e.toAuthJSON());
    return res.json({matches: sendMatches});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const getMatchInfo = async (req, res, next) => {
  const {id} = req.params;
  try {
    const match = await Match.findById(id).populate("carID");
    return res.json({match: match.toMyBookingJSON()});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const getMatchStatuses = async (req, res, next) => {
  try {
    return res.json({status: Match.schema.path("status").enumValues});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: err.message});
  }
};

export const getMyBookings = async (req, res, next) => {
  let condition = {};
  condition.renterID = req.params.id;
  if (req.query.status) {
    try {
      const encoded_status = req.query.status;
      const statuslist = JSON.parse(decodeURIComponent(encoded_status));
      if (statuslist.length) {
        condition.status = {
          $in: statuslist,
        };
      }
    } catch (err) {
      return res.status(500).json({message: err.message});
    }
  }
  if (req.query.carID) {
    condition.carID = req.query.carID;
  }
  if (req.query.lessorID) {
    condition.lessorID = req.query.lessorID;
  }

  try {
    let matches = await Match.find(condition).populate("carID");
    const sendMatches = matches.map((e) => e.toMyBookingJSON());
    for (let match of sendMatches) {
      if (match.car_image) {
        const carImageUrl = await getImageUrl(
          process.env.GCS_CAR_IMAGES_BUCKET,
          null,
          match.car_image
        );
        match.car_image = carImageUrl;
      }
    }
    return res.json({matches: sendMatches, count: sendMatches.length});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const cancelReserevation = async (req, res, next) => {
  const match_id = req.headers.match_id;
  let match;
  try {
    match = await Match.findById(match_id);
    if (match == null) {
      return res.status(404).send({message: "Cannot find match"});
    }
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
  match.status = "Cancelled";
  match.save();
  return res.json(match);
};

export const toggleStatus = async (req, res, next) => {
  const match_id = req.body.match_id;
  const action = req.body.action;
  let match;
  try {
    match = await Match.findById(match_id);
    if (match == null) {
      return res.status(404).json({message: "Cannot find match"});
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({message: err.message});
  }
  if (match.status == "Wait for payment") {
    if (action == "Cancel") {
      match.status = "Cancelled";
    } else if (action == "Paid") {
      match.status = "Rented";
    } else return res.json({message: "No Action can be taken"});
  } else if (match.status == "Unverified renter") {
    if (action == "Cancel") {
      match.status = "Cancelled";
    } else return res.json({message: "No Action can be taken"});
  } else {
    return res.json({message: "No Action can be taken"});
  }
  match.save();
  res.send("Match status changed");
};

export const getMatchesBySearch = async (req, res, next) => {
  let condition = {};
  let search = [
    [{}, {}, {}],
    [{}, {}, {}],
    [{}, {}, {}],
  ];
  let idd = [];
  let allMatches = new Set();
  if (req.query.status) {
    condition.status = req.query.status;
  }
  if (req.query.search) {
    search[0][0].username = {$regex: req.query.search, $options: "i"};
    search[1][1].username = {$regex: req.query.search, $options: "i"};
    search[2][2].license_plate = {$regex: req.query.search, $options: "i"};
  }
  try {
    for (let i = 0; i < 4; i++) {
      let matches;
      if(i!=3){
        matches = await Match.find(condition)
        .populate({
          path: "renterID",
          match: search[i][0],
        })
        .populate({
          path: "lessorID",
          match: search[i][1],
        })
        .populate({
          path: "carID",
          match: search[i][2],
        });
      }
      else{
        if (req.query.search){
          condition._id = {$regex: req.query.search, $options: "i"};
        }
        matches = await Match.find(condition)
      }

      matches = matches.filter(
        (match) =>
          match.renterID !== null &&
          match.lessorID !== null &&
          match.carID !== null
      );
      matches.forEach((match) => {
        if (!idd.includes(match._id.toString())) {
          allMatches.add(match);
          idd.push(match._id.toString());
        }
      });
    }

    let mats;
    if (req.query.sortBy == "oldest date"){
      mats =  [...allMatches].sort(function (a, b) {
        return new Date(a.created_at) - new Date(b.created_at);
      });
    }
    else{
      mats =  [...allMatches].sort(function (a, b) {
        return new Date(b.created_at) - new Date(a.created_at);
      });
    }

    const sendMatches = mats.map((e) => e.toAuthJSON());
    return res.json({matches: sendMatches, count: sendMatches.length});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const matchComplete = async (req, res, next) => {
  const match_id = req.headers.match_id;
  let match;
  try {
    match = await Match.findById(match_id);
    if (match == null) {
      return res.status(404).json({message: "Cannot find match"});
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({message: err.message});
  }
  match.status = "Completed";
  match.save();
  let chat;
  try {
    chat = await Chat.find({ matchID: match_id });
    if (chat == null) {
      return res.status(404).json({message: "Cannot find chat"});
    }
    for (let c of chat){
      await User.updateMany(
        {_id: {$in: c.allowedUsers}},
        {$pull: {chatRooms: c._id}},
        {new: true}
      );
      await Chat.deleteOne({ _id: c._id });
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({message: err.message});
  }
  res.send("Match status changed and Chat deleted");
};