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
      return res.json({user: user.toAuthJSON()});
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

  console.log(req.body.user.email);

  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      user.token = user.generateJWT();
      const cookieData = JSON.stringify(user.toAuthJSON());
      res.cookie("auth", cookieData, {httpOnly: true});
      // res.cookie("auth", cookieData, {httpOnly: true, sameSite: "strict"});
      return res.status(200).send("Login successful");
      return res.json({user: user.getIdJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
};

export const getNavbarInfo = async (req, res, next) => {
  return res.send(req.headers.user_id);
  // try {
  //   const user = await User.findOne({_id: req.headers.user_id}, {image: 1});
  //   return res.json(cars);
  // } catch (err) {
  //   return res.status(500).json({message: err.message});
  // }
};
