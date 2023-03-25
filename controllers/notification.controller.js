import express from "express";
import mongoose from "mongoose";
import Match from "../models/match.model.js";
import Car from "../models/car.model.js";
import Notification from "../models/notification.model.js";

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

export const getNotifications = async (req, res, next) => {
    const { date, time, userID } = req.query;
    const start = new Date(`${date} ${time}`);
  
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
    try {
      const notifications = await Notification.find({
        createdAt: { $gte: start, $lt: end },
        userID: userID,
      })
      const sendNotifications = notifications.map((n) => n.toAuthJSON());
  
      return res.json({ notifications: sendNotifications });
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
};

export const readNotifications = async (req, res, next) => {
    const { userID } = req.query;
    try {
      const notifications = await Notification.find({
        userID: userID,
      })
      for (const notification of notifications) {
        notification.isRead = true;
        notification
            .save()
            .catch(function (error) {
                console.log(error);
                next(error);
            });
      }
      return res.send("Read!");
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
};

export const haveNotifications = async (req, res, next) => {
    const { userID } = req.query;
    try {
      const notifications = await Notification.find({
        userID: userID,
      })
      for (const notification of notifications) {
        if(notification.isRead==false) return res.send(true);
      }
      return res.send(false);
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
};
  