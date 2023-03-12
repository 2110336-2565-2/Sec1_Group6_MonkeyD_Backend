import express from "express";
import mongoose from "mongoose";
import Review from "../models/review.model.js";
import Car from "../models/car.model.js";

export const createReview = async (req, res, next) => {
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

  await Car.findById(carID).then(function (car){
    if (!car){
      return res.status(404).send({
        error: "Car not found"
      });
    }
    car.carConditionRating = car.carConditionRating * car.reviewCount;
    car.hygieneRating = car.hygieneRating * car.reviewCount;
    car.serviceRating = car.serviceRating * car.reviewCount;

    car.carConditionRating = car.carConditionRating + carCondition;
    car.hygieneRating = car.hygieneRating + hygeine;
    car.serviceRating = car.serviceRating + service;

    car.reviewCount = car.reviewCount + 1;

    car.carConditionRating = car.carConditionRating / car.reviewCount;
    car.hygieneRating = car.hygieneRating / car.reviewCount;
    car.serviceRating = car.serviceRating / car.reviewCount;
    car.carRating = (car.carConditionRating + car.hygieneRating + car.serviceRating)/3;
    

    Promise.all([review.save(), car.save()])
        .then(function () {
          return res.json({ review: review.toAuthJSON() });
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
    })
    .catch(function (error) {
      console.log(error);
      next(error);
    });
};

export const getReviews = async (req, res, next) => {
  let condition = {};
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
