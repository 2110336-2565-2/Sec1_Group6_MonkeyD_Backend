import passport from "passport";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import {uploadImage} from "../utils/gcs.utils.js";
import {
  localStrategy,
  googleStrategy,
  facebookStrategy,
} from "../configs/passport.config.js";
import {upload} from "../middlewares/image.middleware.js";

dotenv.config({path: ".env"});
const secret = process.env.JWT_SECRET;

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
        console.log(error);
        return res
          .status(400)
          .send({error: "Username or E-mail already exists"});
      }
      next(error);
    });
};

export const localLogin = (req, res, next) => {
  passport.use(localStrategy);
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

      res.header(user.getIdJSON()).send("Login success");
    } else {
      return res.status(422).json(info);
    }
  })(req, res, next);
};

// for facebook login (soon)
export const facebookLogin = (req, res, next) => {
  passport.use(facebookStrategy);
  passport.authenticate("facebook", {
    scope: ["email"],
    failureRedirect: "/",
  })(req, res, next);
};

// for facebook login (soon)
export const facebookCallback = (req, res, next) => {
  passport.use(facebookStrategy);
  passport.authenticate(
    "facebook",
    {failureRedirect: "/"},
    function (err, user) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/");
      }

      res.redirect("/");
    }
  )(req, res, next);
};

export const googleAuth = (req, res, next) => {
  passport.use(googleStrategy);
  passport.authenticate("google", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (user) {
      // if user is already authenticated with a local strategy, do nothing
      return res.send("Already logged in");
    } else {
      // if user is not authenticated with a local strategy, initiate Google authentication
      return passport.authenticate("google", {scope: ["profile", "email"]})(
        req,
        res,
        next
      );
    }
  })(req, res, next);
};

export const googleCallback = (req, res, next) => {
  passport.use(googleStrategy);
  passport.authenticate(
    "google",
    {failureRedirect: "/login"},
    function (err, user) {
      if (err) {
        return next(err);
      }
      user.token = user.generateJWT();
      const cookieData = user.toAuthJSON();

      res.cookie("auth", cookieData, {
        httpOnly: true,
        sameSite: "lax",
        secure: true,
        expires: 0,
        path: "/",
      });
      res.cookie(
        "userID",
        {userID: user._id},
        {
          sameSite: "lax",
          secure: true,
          expires: 0,
          path: "/",
        }
      );
      res.cookie(
        "username",
        {username: user.username},
        {
          sameSite: "lax",
          secure: true,
          expires: 0,
          path: "/",
        }
      );
      res.redirect(process.env.FRONTEND_PORT);
    }
  )(req, res, next);
};

export const addUserInfo = async (req, res, next) => {
  const id = req.body.id;
  console.log(id);
  try {
    let user = await User.findById(id);
    if (user == null) {
      res.status(404).json({message: "Cannot find user"});
    } else {
      const imageUri = req.file
        ? await uploadImage(req.file, process.env.GCS_PROFILE_BUCKET, null, id)
        : null;
      if (req.body.username) user.username = req.body.username;
      if (imageUri) user.image = imageUri;
      if (req.body.owncars) user.owncars = req.body.owncars;
      if (req.body.isLessor) user.isLessor = req.body.isLessor;
      if (req.body.isAdmin) user.isLessor = req.body.isAdmin;
      if (req.body.firstName) user.firstName = req.body.firstName;
      if (req.body.lastName) user.lastName = req.body.lastName;
      if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
      if (req.body.prefix) user.prefix = req.body.prefix;

      user
        .save()
        .then(function () {
          return res.send("Complete!");
        })
        .catch(function (error) {
          if (error.code === 11000) {
            return res.status(400).send({error: "Username already exists"});
          }
          next(error);
        });
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const getUserInfo = async (req, res, next) => {
  const id = req.body.id;
  try {
    let user = await User.findById(id);
    if (user == null) {
      res.status(404).json({message: "Cannot find user"});
    } else {
      res.send(await user.getUserInfoJSON());
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const logout = async (req, res, next) => {
  // also use for collecting log in the future
  const cookie_name = req.body.cookie_name;
  res.clearCookie(cookie_name, {
    path: "/",
  });
  res.status(200).send("logout succesfully");
};

export const forgotPassword = async (req, res, next) => {
  const {email} = req.body;
  try {
    const user = await User.findOne({email: email}, {_id: 1, username: 1});
    if (user) {
      const token = jwt.sign({userId: user._id}, secret, {expiresIn: "1h"});
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MONKEY_EMAIL_ADR,
          pass: process.env.MONKEY_EMAIL_PWD,
        },
      });

      const mailOptions = {
        from: `Monkey D Car Rent <${process.env.MONKEY_EMAIL_ADR}>`,
        to: email,
        subject: "Password reset instructions",
        html: `<p>Hi ${user.username},</p>
           <p>Click <a href="${process.env.FRONTEND_PORT}/resetPassword?token=${token}">here</a> to reset your password.</p>
           <p>This link will expire in 1 hour.</p>`,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
          return res.status(500).json({message: "Internal server error"});
        }
        return res
          .status(200)
          .json({message: "Password reset instructions sent"});
      });
    } else {
      return res.status(404).json({message: "User not found"});
    }
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const resetPassword = async (req, res, next) => {
  const token = req.body.token;
  const password = req.body.password;

  try {
    const decoded = jwt.verify(token, secret);
    const userId = decoded.userId;

    User.findById(userId, (err, user) => {
      if (err) {
        return res.status(500).json({message: "Internal server error"});
      }
      if (!user) {
        return res.status(404).json({message: "User not found"});
      }
      user.setPassword(password);
      user.save((err, updatedUser) => {
        if (err) {
          return res.status(500).json({message: "Internal server error"});
        }
        res.status(200).json({message: "Password reset successfully"});
      });
    });
  } catch (error) {}
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

  const {
    prefix,
    first_name,
    last_name,
    phone_number,
    driving_license,
    identification_number,
  } = req.body;

  let drivingLicenseImageUri;
  if (
    req.files &&
    req.files["drivingLicenseImage"] &&
    req.files["drivingLicenseImage"].length > 0
  ) {
    const drivingLicenseImage = req.files["drivingLicenseImage"];

    drivingLicenseImageUri = await uploadImage(
      drivingLicenseImage[0],
      process.env.GCS_DRIVER_LICENSE_BUCKET,
      "",
      renter_id
    );
    renter.drivingLicenseImage = drivingLicenseImageUri;
  }

  let IDCardImageUri;
  if (
    req.files &&
    req.files["IDCardImage"] &&
    req.files["IDCardImage"].length > 0
  ) {
    const IDCardImage = req.files["IDCardImage"];

    IDCardImageUri = await uploadImage(
      IDCardImage[0],
      process.env.GCS_ID_CARD_BUCKET,
      "",
      renter_id
    );
    renter.IDCardImage = IDCardImageUri;
  }

  renter.rentedCount += 1;
  lessor.rentedOutCount += 1;
  if (prefix) renter.prefix = prefix;
  if (first_name) renter.firstName = first_name;
  if (last_name) renter.lastName = last_name;
  if (phone_number) renter.phoneNumber = phone_number;
  if (driving_license) renter.drivingLicenseNumber = driving_license;
  if (identification_number) renter.IDCardNumber = identification_number;
  renter.save();
  lessor.save();
  res.send("car rented");
};

export const getNavbarInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({_id: req.headers.user_id});
    return res.json({user: await user.getNavbarInfoJSON()});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const updateRoleLessor = async (req, res, next) => {
  const user_id = req.headers.user_id;
  const prefix = req.body.prefix;
  const first_name = req.body.first_name;
  const last_name = req.body.last_name;
  const phone_number = req.body.mobile_number;
  const driving_license = req.body.driving_license;
  const identification_number = req.body.identification_number;

  let user;
  try {
    user = await User.findById(user_id);
    if (user == null) {
      return res.status(404).json({message: "cannot find user"});
    }
  } catch (err) {
    return res.status(500).json({message: err.message});
  }

  let drivingLicenseImageUri;
  if (
    req.files &&
    req.files["drivingLicenseImage"] &&
    req.files["drivingLicenseImage"]
  ) {
    const drivingLicenseImage = req.files["drivingLicenseImage"];

    drivingLicenseImageUri = await uploadImage(
      drivingLicenseImage[0],
      process.env.GCS_DRIVER_LICENSE_BUCKET,
      "",
      user_id
    );
    user.drivingLicenseImage = drivingLicenseImageUri;
  }

  let IDCardImageUri;
  if (
    req.files &&
    req.files["IDCardImage"] &&
    req.files["IDCardImage"].length > 0
  ) {
    const IDCardImage = req.files["IDCardImage"];

    IDCardImageUri = await uploadImage(
      IDCardImage[0],
      process.env.GCS_ID_CARD_BUCKET,
      "",
      user_id
    );
    user.IDCardImage = IDCardImageUri;
  }

  user.isLessor = true;
  user.prefix = prefix;
  user.firstName = first_name;
  user.lastName = last_name;
  user.phoneNumber = phone_number;
  user.drivingLicenseNumber = driving_license;
  user.IDCardNumber = identification_number;
  user.save();
  res.send("role lessor updated");
};

export const updateRoleAdmin = async (req, res, next) => {
  const user_id = req.headers.user_id;
  let user;
  try {
    user = await User.findById(user_id);
    if (user == null) {
      return res.status(404).json({message: "cannot find user"});
    }
  } catch (err) {
    return res.status(500).json({message: err.message});
  }

  user.isAdmin = true;
  user.save();
  res.send("role admin updated");
};

export const checkLogin = async (req, res, next) => {
  return res.status(200).json({isLogin: true});
};

export const getUserRole = async (req, res, next) => {
  const id = req.body.id;
  try {
    let user = await User.findById(id);
    if (user == null) {
      res.status(404).json({message: "Cannot find user"});
    } else {
      res.send({
        userRole: user.isLessor ? "lessor" : "renter",
      });
    }
  } catch (error) {
    res.status(500).json({message: error.message});
  }
};

export const toggleStatus = async (req, res, next) => {
  const user_id = req.body.user_id;
  const action = req.body.action;
  let user;
  try {
    user = await User.findById(user_id);
    if (user == null) {
      return res.status(404).json({message: "Cannot find user"});
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({message: err.message});
  }
  if (user.status == "Unverified") {
    if (action == "Approve") {
      user.status = "Verified";
    } else if (action == "Reject") {
      user.status = "Rejected";
    }
  } else if (user.status == "Rejected") {
    if (action == "Approve") {
      user.status = "Verified";
    } else return res.json({message: "No Action can be taken"});
  } else {
    return res.json({message: "No Action can be taken"});
  }
  user.save();
  res.send("User status changed");
};

export const getUsersBySearch = async (req, res, next) => {
  const show_attrs = {
    _id: 1,
    image: 1,
    username: 1,
    email: 1,
    prefix: 1,
    firstName: 1,
    lastName: 1,
    phoneNumber: 1,
    IDCardNumber: 1,
    IDCardImage: 1,
    drivingLicenseNumber: 1,
    drivingLicenseImage: 1,
    status: 1,
  };
  let condition = [{}, {}, {}];
  let allUsers = new Set();
  let idd = [];
  if (req.query.status) {
    condition[0].status = req.query.status;
    condition[1].status = req.query.status;
    condition[2].status = req.query.status;
  }
  if (req.query.search) {
    condition[0].username = {$regex: req.query.search, $options: "i"};
    condition[1].firstName = {$regex: req.query.search, $options: "i"};
    condition[2].lastName = {$regex: req.query.search, $options: "i"};
  }
  try {
    for (let i = 0; i < 3; i++) {
      let users = await User.find(condition[i], show_attrs);
      users.forEach((user) => {
        if (!idd.includes(user._id.toString())) {
          allUsers.add(user);
          idd.push(user._id.toString());
          console.log(user._id.toString());
        }
      });
      // count += users.length;
      // const sendCars = cars.map((e) => e.toAuthJSON());
      // return res.json({users: users, count: users.length});
    }
    const sendUsers = Array.from(allUsers);
    return res.json({users: sendUsers, count: sendUsers.length});
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};
