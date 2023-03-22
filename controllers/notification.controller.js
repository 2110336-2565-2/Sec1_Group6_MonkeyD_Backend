import express from "express";
import mongoose from "mongoose";
import Match from "../models/match.model.js";
import Car from "../models/car.model.js";

export const createNotification = (req, res, next) => {
    const notification = new Notification();
    const {
        text,
        images,
        userID,
      } = req.body.notification;
    if (text) notification.text = text;
    if (images) notification.images = images;
    if (userID) notification.userID = userID;

    notification
    .save()
    .then(function () {
      return res.json({notification: notification.toAuthJSON()});
    })
    .catch(function (error) {
      console.log(error);
      next(error);
    });
}