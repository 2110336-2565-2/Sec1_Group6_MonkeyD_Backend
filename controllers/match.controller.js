import express from "express";
import mongoose from "mongoose";
import Match from "../models/match.model.js";
import Car from "../models/car.model.js";
import {getImageUrl} from "../utils/gcs.utils.js";

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
    const match = await Match.findById(id).populate("carID");
    return res.json({match: match.toMyBookingJSON()});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const getMatchStatuses = async (req, res, next) => {
  try {
    //console.log(Match);
    return res.json({status: Match.schema.path("status").enumValues});
  } catch (err) {
    console.log(err);
    return res.status(500).json({message: err.message});
  }
};

export const getMyBookings = async (req, res, next) => {
  let condition = {};
  condition.renterID = req.params.id;
  // if (req.query.status) {
  //   condition.status = req.query.status;
  // }
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
  const car_id = req.headers.car_id;
  const match_id = req.headers.match_id;
  let car;
  try {
    car = await Car.findById(car_id);
    if (car == null) {
      return res.status(404).send({message: "Cannot find car"});
    }
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
  let match;
  try {
    match = await Match.findById(match_id);
    if (car == null) {
      return res.status(404).send({message: "Cannot find match"});
    }
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
  car.renter = "";
  car.status = "Available";
  match.status = "Cancelled";
  Promise.all([match.save(), car.save()])
    .then(function () {
      return res.json(match);
    })
    .catch(function (error) {
      console.log(error);
      if (error.code === 11000) {
        return res.status(400).send({
          error: "Something already exists",
        });
      }
      console.log(error);
      next(error);
    });
};
