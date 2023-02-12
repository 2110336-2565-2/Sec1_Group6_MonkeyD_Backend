import express from "express";
import mongoose from "mongoose";
import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import User from "../models/user.model.js";

export const createUser = (req, res, next) => {
  console.log(req.body);
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
      return res.json({user: user.toAuthJSON()});
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
};



export const AddInform = async (req, res, next) => {
  console.log('Add!');
  const  id  = req.body.id;
  try{
    let user = await User.findById(id);
    if(user == null){
      res.status(404).json({ message: 'Cannot find user' })
    }
    else{
      if(req.body.username != null) user.username = req.body.username;
      if(req.body.image != null) user.image = req.body.image;
      if(req.body.owncars != null) user.owncars = req.body.owncars;
      if(req.body.isLesser != null) user.isLesser = req.body.isLesser;
      if(req.body.firstName != null) user.firstName = req.body.firstName;
      if(req.body.lastName != null) user.lastName = req.body.lastName;
      if(req.body.phoneNumber != null) user.phoneNumber = req.body.phoneNumber;
      if(req.body.prefix != null) user.prefix = req.body.prefix;

      user
        .save()
        .then(function () {
          return res.send('Complete!');
        })
        .catch(function (error) {
          if (error.code === 11000) {
            return res
              .status(400)
              .send({error: "Username already exists"});
          }
          next(error);
        });
    }
    
  }
  catch (error){
    res.status(500).json({ message: error.message })
  }
};

export const ViewInfo = async (req, res, next) => {
  console.log('View!');
  const  id  = req.body.id;
  try{
    let user = await User.findById(id);
    if(user == null){
      res.status(404).json({ message: 'Cannot find user' })
    }
    else{
      res.send({
        username: user.username,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        prefix: user.prefix,
        owncars: user.owncars
      });
    }
  }
  catch (error){
    res.status(500).json({ message: error.message })
  }
}
