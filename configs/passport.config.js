import passport from "passport";
import {Strategy as LocalStrategy} from "passport-local";
import mongoose from "mongoose";
import User from "../models/user.model.js";

passport.use(
  new LocalStrategy(
    {
      usernameField: "user[email]",
      passwordField: "user[password]",
    },
    function (email, password, done) {
      User.findOne({email: email})
        .then(function (user) {
          if (!user || !user.validPassword(password)) {
            return done(null, false, {
<<<<<<< HEAD
              error: "email or password is invalid",
=======
              errors: "email or password is invalid",
>>>>>>> main
            });
          }
          return done(null, user);
        })
        .catch(done);
    }
  )
);
