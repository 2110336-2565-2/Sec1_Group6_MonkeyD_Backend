import express from "express";
import mongoose from "mongoose";
import {
  addFunds,
  createAccount,
  getOmiseBalance,
  // addFunds,
} from "../utils/stripe.utils.js";
import Match from "../models/match.model.js";
import Payment from "../models/payment.model.js";
import User from "../models/user.model.js";

export const createPayment = (req, res, next) => {
  const payment = new Payment();
  const {status, lessorID, renterID, matchID, price} = req.body.payment;
  if (status) payment.status = status;
  if (lessorID) payment.lessorID = lessorID;
  if (renterID) payment.renterID = renterID;
  if (matchID) payment.matchID = matchID;
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

export const getPaymentsByID = async (req, res, next) => {
  const {id} = req.params;
  try {
    let payment = await Payment.findById(id);
    if (payment == null) {
      return res.status(404).json({message: "Cannot find payment"});
    } else {
      return res.send(payment.getByIDJSON());
    }
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

export const createOmiseAccount = async (req, res, next) => {
  const {id} = req.params;
  const cardToken = req.body.cardToken;
  try {
    let user = await User.findById(id);
    user = await createAccount(user, 0, cardToken);
    // console.log(user);
    await user.save();
    return res.json(user);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Failed to get wallet balance"});
  }
};

export const createOmiseCharge = async (req, res, next) => {
  const {id} = req.params;
  const amount = req.body.amount;
  const description = req.body.description;
  try {
    let user = await User.findOne({_id: id}, {omiseCustomerId: 1}).lean();

    if (!user) {
      return res.status(404).json({message: "User not found"});
    }

    const charge = await omiseClient.charges.create({
      amount,
      currency: "THB",
      customer: user.omiseCustomerId,
      description,
    });

    return res.json(charge);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Failed to charge user"});
  }
};
