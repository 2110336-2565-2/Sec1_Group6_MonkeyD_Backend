import express from "express";
import mongoose from "mongoose";
import Car from "../models/car.model.js";
import Match from "../models/match.model.js";
import User from "../models/user.model.js";
import {uploadImage, getImageUrl} from "../utils/gcs.utils.js";
import {ObjectId} from "bson";

export const createCars = async (req, res, next) => {
  const car = new Car();

  const {
    owner,
    status = "Pending",
    brand,
    model,
    year,
    gear_type,
    license_plate,
    registration_book_id,
    description,
    available_location,
    energy_types,
    province,
    available_times,
    passenger,
    rating = 0,
    rental_price,
  } = req.body;

  const id = req.body.owner_user_id;
  const carId = new ObjectId();

  const car_images = req.files["car_images"];
  const car_image_uris = [];
  for (const car_image of car_images) {
    const imageUri = await uploadImage(
      car_image,
      process.env.GCS_CAR_IMAGES_BUCKET,
      `${id}/${carId}`,
      null
    );
    car_image_uris.push(imageUri);
  }

  const registration_book_image = req.files["registration_book_image"];

  const registration_book_image_uri = await uploadImage(
    registration_book_image[0],
    process.env.GCS_CAR_REGISTRATION_BOOK_BUCKET,
    "",
    carId
  );
  console.log(energy_types);
  car._id = carId;
  if (owner) car.owner = owner;
  if (status) car.status = status;
  if (brand) car.brand = brand;
  if (model) car.model = model;
  if (year) car.year = year;
  if (gear_type) car.gear_type = gear_type;
  if (license_plate) car.license_plate = license_plate;
  if (registration_book_id) car.registration_book_id = registration_book_id;
  if (registration_book_image_uri)
    car.registration_book_url = registration_book_image_uri;
  if (description) car.description = description;
  if (available_location) car.available_location = available_location;
  if (energy_types) car.energy_types = energy_types;
  if (province) car.province = province;
  if (rental_price) car.rental_price = rental_price;
  if (passenger) car.passenger = passenger;
  if (rating) car.rating = rating;
  if (car_image_uris.length) car.car_images = car_image_uris;
  if (available_times) car.setAvailableTimes(available_times);

  car
    .save()
    .then(function () {
      return res.json({car: car.toAuthJSON()});
    })
    .catch(function (error) {
      console.log(error);
      if (error.code === 11000) {
        return res.status(400).send({
          error:
            "license_plate or registration_book_id or registration_book_url already exists",
        });
      }
      console.log(error);
      next(error);
    });
};

export const getCars = async (req, res, next) => {
  const show_attrs = {
    owner: 1,
    brand: 1,
    model: 1,
    gear_type: 1,
    energy_types: 1,
    passenger: 1,
    rating: 1,
    province: 1,
    rental_price: 1,
    car_images: 1,
  };

  let condition = {renter: null || ""};
  if (req.query.minprice || req.query.maxprice) {
    condition.rental_price = {
      $gte: parseFloat(req.query.minprice) || 0,
      $lte: parseFloat(req.query.maxprice) || 10000000,
    };
  }
  if (req.query.minrating || req.query.maxrating) {
    condition.rating = {
      $gte: parseFloat(req.query.minrating) || 0,
      $lte: parseFloat(req.query.maxrating) || 5,
    };
  }
  if (req.query.startdate && req.query.enddate) {
    condition.available_times = {
      $elemMatch: {
        start: {$lte: new Date(req.query.startdate)},
        end: {$gte: new Date(req.query.enddate)},
      },
    };
  }
  if (req.query.province) {
    condition.province = req.query.province;
  }
  if (req.query.brandlist) {
    try {
      const encoded_brandlist = req.query.brandlist;
      const brandlist = JSON.parse(decodeURIComponent(encoded_brandlist));
      if (brandlist.length) {
        condition.brand = {
          $in: brandlist,
        };
      }
    } catch (err) {
      return res.status(500).json({message: err.message});
    }
  }

  try {
    let cars = await Car.find(condition, show_attrs).lean();
    for (const car of cars) {
      if (car.car_images && car.car_images.length) {
        const user = await User.findOne(
          {username: car.owner},
          {_id: 1, image: 1}
        );
        let userImageUrl;
        userImageUrl = await getImageUrl(
          process.env.GCS_PROFILE_BUCKET,
          null,
          user.image
        );
        car.user_image = userImageUrl;

        const carImageUrl = await getImageUrl(
          process.env.GCS_CAR_IMAGES_BUCKET,
          null,
          car.car_images[0]
        );

        car.car_image = carImageUrl;
        delete car.car_images;
      }
    }
    return res.json(cars);
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const getCarInfo = async (req, res, next) => {
  const {id} = req.params;
  try {
    let car = await Car.findOne({_id: id}).lean();
    const user = await User.findOne(
      {username: car.owner},
      {_id: 1, image: 1, rating: 1}
    );

    let car_url = [];

    for (const car_image in car.car_images) {
      console.log(car.car_images[car_image]);
      let carImageUrl = await getImageUrl(
        process.env.GCS_CAR_IMAGES_BUCKET,
        null,
        car.car_images[car_image]
      );
      car_url.push(carImageUrl);
    }

    const user_image = await getImageUrl(
      process.env.GCS_PROFILE_BUCKET,
      null,
      user.image
    );
    car.car_images = car_url;
    car.user_image = user_image;
    car.user_rating = user.rating;
    car.owner_id = user._id;
    return res.json(car);
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const getMyCar = async (req, res, next) => {
  const {username} = req.params;

  try {
    let cars = await Car.find(
      {owner: username},
      {
        //_id: 1,
        //renter: 1,
        status: 1,
        energy_types: 1,
        rating: 1,
        rentedOutCount: 1,
        brand: 1,
        model: 1,
        gear_type: 1,
        available_location: 1,
        rental_price: 1,
        passenger: 1,
        car_images: 1,
        available_times: 1,
        unavailable_times: 1,
      }
    ).lean();
    console.log(username);
    //const user_image = await User.findOne({username: username}, {image: 1}).lean();
    for (const car of cars) {
      /*if (car.status == "Rented"){
        const match = await Match.findOne(
          {carID: car._id, status: 'Rented'},
          {pickUpDateTime: 1, pickupLocation: 1, returnDateTime:1, returnLocation: 1, price: 1}).lean();
        car.pickUpDateTime = match.pickUpDateTime;
        car.pickupLocation = match.pickupLocation;
        car.returnDateTime = match.returnDateTime;
        car.returnLocation = match.returnLocation;
        car.totalprice = match.price;
      }
      else{
        car.pickUpDateTime = null;
        car.pickupLocation = null;
        car.returnDateTime = null;
        car.returnLocation = null;
        car.totalprice = null;
      }*/
      if (car.car_images && car.car_images.length) {
        const correctURLs = [];
        for (let i = 0; i < car.car_images.length; i += 1) {
          const carImageUrl = await getImageUrl(
            process.env.GCS_CAR_IMAGES_BUCKET,
            null,
            car.car_images[i]
          );
          if (i == 0) car.car_image = carImageUrl;
          correctURLs.push(carImageUrl);
        }
        car.show_images = correctURLs;
      }
      car.status = car.status === "Unavailable" ? "Unavailable" : "Available";

      //delete car._id
      //car.user_image = user_image.image;
    }

    console.log(cars);

    return res.json(cars);
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const toggleRented = async (req, res, next) => {
  const car_id = req.headers.car_id;
  const renter_id = req.headers.renter_id;
  const pickUpDateTime = req.body.pickUpDateTime;
  const returnDateTime = req.body.returnDateTime;
  let car;
  try {
    car = await Car.findById(car_id);
    if (car == null) {
      return res.status(404).json({message: "Cannot find car"});
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({message: err.message});
  }

  let renter;
  try {
    renter = await User.findById(renter_id);
    if (renter == null) {
      return res.status(404).json({message: "Cannot find user"});
    }
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({message: err.message});
  }

  //if (car.status == "Available") {
  //car.status = "Rented";
  //car.renter = renter.username;
  car.status = car.status === "Unavailable" ? "Unavailable" : "Available";
  car.rentedOutCount += 1;
  car.unavailable_times.push({
    start: pickUpDateTime,
    end: returnDateTime,
    username: renter.username,
  });
  car.save();
  res.send("car rented");
  //} else {
  //car.status = "Available";
  //car.renter = "";
  // car.save();
  //res.send("car available");
  //}
};

export const deleteCar = async (req, res, next) => {
  const car_id = req.headers.car_id;
  let car;
  try {
    car = await Car.findByIdAndDelete(car_id);
    if (car == null) {
      return res.status(404).send({message: "Cannot find car"});
    }
    res.send({message: `Car with ID ${car_id} deleted successfully`});
  } catch (err) {
    console.log.error(err.message);
    return res.status(500).json({message: err.message});
  }
};

export const getNumberOfRentals = async (req, res, next) => {
  const {id} = req.params;
  try {
    let car = await Car.findOne({_id: id}, {rentedOutCount: 1});
    if (car == null) {
      return res.status(404).json({message: "Cannot find car"});
    } else {
      return res.json(car);
    }
  } catch (error) {
    return res.status(500).json({message: error.message});
  }
};

export const changeCarInfo = async (req, res, next) => {
  const car_id = req.headers.car_id;
  let car;
  try {
    car = await Car.findById(car_id);
    if (car == null) {
      return res.status(404).json({message: "Cannot find car"});
    }

    // if (
    //   req.body.status !== null &&
    //   req.body.status !== "Unavailable" &&
    //   req.body.status !== "Available"
    // ) {
    //   return res
    //     .status(400)
    //     .json({message: "Status can only be changed to Unavailable"});
    // }

    Car.findOneAndUpdate({_id: car_id}, req.body, {new: true}, (err, car) => {
      if (err) {
        console.log(err);
      } else {
        console.log(car);
      }
    });
    res.send({message: `Car with ID ${car_id} updated successfully`});
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({message: err.message});
  }
};
