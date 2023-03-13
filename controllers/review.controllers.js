import express from "express";
import mongoose from "mongoose";
import Review from "../models/review.model.js";

export const createReview = (req, res, next) => {
  const review = new Review();
  const {hygeine, carCondition, service, comment, matchID, reviewerID, carID} =
    req.body.review;
  if (hygeine) review.hygeine = hygeine;
  if (carCondition) review.carCondition = carCondition;
  if (service) review.service = service;
  if (comment) review.comment = comment;
  if (matchID) review.matchID = matchID;
  if (carID) review.carID = carID;
  if (reviewerID) review.reviewerID = reviewerID;
  review
    .save()
    .then(function () {
      return res.json({review: review.toAuthJSON()});
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

export const getReviews = async (req, res, next) => {
  let condition = {};
  if (req.body.carID){
    condition.status = req.body.carID;
  }
  try {
    let reviews = await Review.find(condition);
    const sendReviews = reviews.map((e) => e.toAuthJSON());
    return res.json({reviews: sendReviews});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const getReviewInfo = async (req, res, next) => {
  const {id} = req.params;
  try {
    const review = await Review.findById(id);
    return res.json({review: review.toAuthJSON()});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};
