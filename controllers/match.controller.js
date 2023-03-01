import express from "express";
import mongoose from "mongoose";
import Match from "../models/match.model.js";

export const createMatch = (req, res, next) => {
  const match = new Match();
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
    const match = await Match.findById(id);
    return res.json({match: match.toAuthJSON()});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};