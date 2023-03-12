import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import {Strategy as FacebookStrategy} from "passport-facebook";
import {Strategy as GoogleStrategy} from "passport-google-oauth20";
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/user.model.js";

dotenv.config({path: ".env"});

export const localStrategy = new LocalStrategy(
  {
    usernameField: "user[email]",
    passwordField: "user[password]",
  },
  function (email, password, done) {
    User.findOne({email: email})
      .then(function (user) {
        if (!user || !user.validPassword(password)) {
          return done(null, false, {
            error: "email or password is invalid",
          });
        }
        return done(null, user);
      })
      .catch(done);
  }
);

export const facebookStrategy = new FacebookStrategy(
  {
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: process.env.BACKEND_PORT,
    profileFields: ["id", "displayName", "photos", "email"],
  },
  function (accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
);

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_PORT}/auth/google/callback`,
    scope: ["profile", "email"],
  },
  function (accessToken, refreshToken, profile, cb) {
    User.findOne({googleId: profile.id}, function (err, user) {
      if (err) {
        return cb(err);
      }
      if (user) {
        // User already exists, return the existing user
        return cb(null, user);
      } else {
        // User does not exist, create a new user with the given Google ID
        User.create(
          {
            googleId: profile.id,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            email: profile.emails[0].value,
            username: profile.emails[0].value.split("@")[0],
            image: profile.photos[0].value,
          },
          function (err, newUser) {
            if (err) {
              return cb(err);
            }

            return cb(null, newUser);
          }
        );
      }
    });

    // return profile;
  }
);

passport.use(googleStrategy);
