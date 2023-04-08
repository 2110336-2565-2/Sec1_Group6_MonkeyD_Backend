import express from "express";
import mongoose from "mongoose";
import {
  chargeAccount,
  createRecipient,
  createTransfer,
  createCustomer,
  getCharges,
  getTransfers,
} from "../utils/omise.utils.js";
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

export const createOmiseCharge = async (req, res, next) => {
  const {id} = req.params;
  const cardToken = req.body.cardToken;
  const amount = req.body.amount;
  const description = req.body.description;
  try {
    let user = await User.findById(id);
    let omiseCustomerId = user.omiseCustomerId;

    if (!omiseCustomerId) {
      omiseCustomerId = await createCustomer(id, user.email, cardToken);
      user.omiseCustomerId = omiseCustomerId;
      user.save();
    }
    const charge = await chargeAccount(amount, omiseCustomerId, description);
    return res.json(charge);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Failed to get wallet balance"});
  }
};

export const createOmiseTransfer = async (req, res, next) => {
  const {id} = req.params;
  let amount = req.body.amount;
  amount = amount * 0.85; // fee 20%
  try {
    let user = await User.findById(id);
    const bankAccount = {
      // have to get from database
      name: user.username,
      brand: "test",
      number: "1234567890",
      bank_code: "bbl",
      branch_code: "0001",
      account_type: "savings",
    };
    let omiseRecipientId = user.omiseRecipientId;

    if (!omiseRecipientId) {
      omiseRecipientId = await createRecipient(
        user.username,
        user.email,
        bankAccount
      );
      user.omiseRecipientId = omiseRecipientId;
      user.save();
    }
    let transfer = await createTransfer(omiseRecipientId, amount);
    return res.json(transfer);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Failed to transfer"});
  }
};

// export const getOmiseCharges = async (req, res, next) => {
//   try {
//     let charges = await getCharges(user.omiseCustomerId, 20, 0);
//     return res.json(charges);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({message: "Failed to transfer"});
//   }
// };

// export const getOmiseTransfers = async (req, res, next) => {
//   try {
//     let transfers = await getTransfers(user.omiseRecipientId, 20, 0);
//     return res.json(transfers);
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({message: "Failed to transfer"});
//   }
// };

export const getOmiseTransactions = async (req, res, next) => {
  const {id} = req.params;
  try {
    let user = await User.findById(id);
    if (!user.omiseRecipientId && !user.omiseCustomerId) {
      return res.json([]);
    }
    let charges = await getCharges(user.omiseCustomerId, 20, 0);
    let transfers = await getTransfers(user.omiseRecipientId, 20, 0);
    let transactions = [...charges, ...transfers];
    await transactions.sort((a, b) => {
      return new Date(b.created_at) - new Date(a.created_at);
    });
    return res.json(transactions);
  } catch (error) {
    console.error(error);
    return res.status(500).json({message: "Failed to get transaction"});
  }
};
