import express from "express";
import mongoose from "mongoose";
import Match from "../models/match.model.js";
import Payment from "../models/payment.model.js";

export const createMatch = (req, res, next) => {
  const match = new Match();
  const {
    status,
    lessorID,
    renterID,
    matchID,
    price,
  } = req.body.payment;
  if (status) payment.status = status;
  if (lessorID) payment.lessorID = lessorID;
  if (renterID) payment.renterID = renterID;
  if (matchID) payment.renterID = matchID;
  if (price) payment.price = price;

  payment
    .save()
    .then(function () {
      return res.json({payment: payment.toAuthJSON()});
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

export const getPayments = async (req, res, next) => {
  let condition = {};
  if (req.query.lessorID) {
    condition.lessorID = req.query.lessorID;
  }
  if (req.query.renterID) {
    condition.renterID = req.query.renterID;
  }

  try {
    let payments = await Payment.find(condition);
    const sendPayments = payments.map((e) => e.toAuthJSON());
    return res.json({payments: sendPayments});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};