import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import User from "../models/user.model.js";

export const createUser = (req, res, next) => {
  const user = new User();
  user.username = req.body.user.username;
  user.email = req.body.user.email;
  user.setPassword(req.body.user.password);

  user
    .save()
    .then(function () {
      return res.json({message: "Create account successfully"});
    })
    .catch(function (error) {
      if (error.code === 11000) {
        return res
          .status(400)
          .send({error: "Username or E-mail already exists"});
      }
      next(error);
    });
};

export const login = (req, res, next) => {
  if (!req.body.user.email) {
    return res.status(422).json({errors: {email: "can't be blank"}});
  }
  if (!req.body.user.password) {
    return res.status(422).json({errors: {password: "can't be blank"}});
  }
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      user.token = user.generateJWT();
      const cookieData = user.toAuthJSON();

      res.cookie("auth", cookieData, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        expires: 0,
        path: "/",
      });

      res.set(user.getIdJSON()).send("Login success");
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
};

export const logout = async (req, res, next) => {
  // also use for collecting log in the future
  const cookie_name = req.body.cookie_name;
  console.log(cookie_name);
  res.clearCookie(cookie_name, {
    path: "/",
  });
  res.status(200).send("logout succesfully");
};

export const carRented = async (req, res, next) => {
  const renter_id = req.headers.renter_id;
  const lessor_id = req.headers.lessor_id;
  let renter;
  try {
    renter = await User.findById(renter_id);
    if (renter == null) {
      return res.status(404).json({message: "Cannot find renter"});
    }
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
  let lessor;
  try {
    lessor = await User.findById(lessor_id);
    if (lessor == null) {
      return res.status(404).json({message: "Cannot find lessor"});
    }
  } catch (err) {
    return res.status(500).json({message: err.message});
  }

  renter.rentedCount += 1;
  lessor.rentedOutCount += 1;
  renter.save();
  lessor.save();
  res.send("car rented");
};

export const getNavbarInfo = async (req, res, next) => {
  try {
    const user = await User.findOne(
      {_id: req.headers.user_id},
      {username: 1, image: 1}
    );
    return res.json({user: user.getNavbarJSON()});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const checkLogin = async (req, res, next) => {
  return res.status(200).json({isLogin: true});
};
