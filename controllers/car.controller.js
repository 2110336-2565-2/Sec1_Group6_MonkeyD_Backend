import express from "express";
import mongoose from "mongoose";
import Car from "../models/car.model.js";
import User from "../models/user.model.js";

export const createCars = (req, res, next) => {
  console.log(req.body);
  const car = new Car();
  const {
    owner,
    status,
    brand,
    model,
    age,
    gear_type,
    license_plate,
    registration_book_id,
    registration_book_url,
    energy_types,
    province,
    available_times,
    passenger,
    rating,
    rental_price,
    car_images,
  } = req.body.car;
  car.owner = owner;
  car.status = status;
  car.brand = brand;
  car.model = model;
  car.age = age;
  car.gear_type = gear_type;
  car.license_plate = license_plate;
  car.registration_book_id = registration_book_id;
  car.registration_book_url = registration_book_url;
  car.energy_types = energy_types;
  car.province = province;
  car.rental_price = rental_price;
  car.passenger = passenger;
  car.rating = rating;
  car.car_images = car_images;
  car.setAvailableTimes(available_times);

  car
    .save()
    .then(function () {
      return res.json({car: car.toAuthJSON()});
    })
    .catch(function (error) {
      if (error.code === 11000) {
        return res.status(400).send({
          error:
            "license_plate or registration_book_id or registration_book_url already exists",
        });
      }
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

  let condition = {};
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
        car.car_image = car.car_images[0];
        delete car.car_images;
      }
      const user_image = await User.findOne({username: car.owner}, {image: 1});
      car.user_image = user_image.image;
    }
    return res.json(cars);
  } catch (err) {
    return res.status(500).json({message: err.message});
  }
};

export const toggleRented = async (req, res, next) => {
  const car_id = req.headers.car_id;
  const renter_id = req.headers.renter_id;
  let car
  try {
    car = await Car.findById(car_id)
    if (car == null) {
      return res.status(404).json({ message: 'Cannot find car'})
    }
  } catch (err){
    return res.status(500).json({message: err.message})
  }

  let renter
  try {
    renter = await User.findById(renter_id)
    if (renter == null) {
      return res.status(404).json({ message: 'Cannot find user'})
    }
  } catch (err){
    return res.status(500).json({message: err.message})
  }

  if (car.status == "Available"){
    car.status = "Rented"
    car.renter = renter.username
    car.rentedOutCount += 1
    car.save()
    res.send("car rented")
  }
  else{
    car.status = "Available"
    car.renter = ""
    car.save()
    res.send("car available")
  }
};