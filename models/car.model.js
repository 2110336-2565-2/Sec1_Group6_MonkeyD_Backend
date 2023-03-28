import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config({path: ".env"});

const CarSchema = new mongoose.Schema(
  {
    owner: {
      type: String,
      lowercase: true,
      required: [true, "can't be blank"],
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
      index: true,
    },
    renter: {
      type: String,
      lowercase: true,
      default: "",
      match: [/^[a-zA-Z0-9]+$/, "is invalid"],
    },
    status: {
      type: String,
      required: [true, "can't be blank"],
      enum: [
        "Pending",
        // "Verified",
        // "Updating",
        "Unavailable",
        "Available",
        "Rented",
        // "WaitForInspectation",
        // "Inspected",
        // "FixingOrPreparing",
        // "CarChecking",
      ],
      default: "Pending",
    },
    brand: {
      type: String,
      required: [true, "can't be blank"],
    },
    model: {
      type: String,
      required: [true, "can't be blank"],
    },
    gear_type: {
      type: String,
      enum: ["Manual", "Auto"],
      required: [true, "can't be blank"],
    },
    year: {
      type: Number,
      required: [true, "can't be blank"],
    },
    description: {
      type: String,
    },
    license_plate: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
    },
    registration_book_id: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
    },
    registration_book_url: {
      type: String,
      unique: true,
      required: [true, "can't be blank"],
    },
    available_location: {
      type: String,
      // required: [true, "can't be blank"],
    },
    energy_types: [
      {
        type: String,
        enum: [
          "DieselB7",
          "DieselB10",
          "Gasohol95",
          "Gasohol91",
          "E20",
          "E85",
          "LPG",
          "NGV",
          "EV",
        ],
        required: [true, "can't be blank"],
      },
    ],
    province: {
      type: String,
      required: [true, "can't be blank"],
    },
    available_times: [
      {
        start: {
          type: Date,
          required: [true, "can't be blank"],
        },
        end: {
          type: Date,
          required: [true, "can't be blank"],
        },
      },
    ],
    unavailable_times: [
      {
        start: {
          type: Date,
        },
        end: {
          type: Date,
        },
        username: {
          type: String,
        },
      },
    ],
    car_images: {
      type: [String],
      validate: (v) => Array.isArray(v) && v.length > 0,
    },
    rental_price: {
      type: Number,
      required: [true, "can't be blank"],
      min: 0,
    },
    passenger: {
      type: Number,
      required: [true, "can't be blank"],
      min: 0,
    },
    hygieneRating: {
      type: Number,
      required: [true, "can't be blank"],
      min: 0,
      max: 5,
      default: 5,
    },
    carConditionRating: {
      type: Number,
      required: [true, "can't be blank"],
      min: 0,
      max: 5,
      default: 5,
    },
    serviceRating: {
      type: Number,
      required: [true, "can't be blank"],
      min: 0,
      max: 5,
      default: 5,
    },
    rating: {
      type: Number,
      required: [true, "can't be blank"],
      min: 0,
      max: 5,
      default: 0,
    },
    reviewCount: {
      type: Number,
      required: [true, "can't be blank"],
      default: 0,
    },
    rentedOutCount: {
      type: Number,
      default: 0,
    },
  },

  {timestamps: true}
);

// CarSchema.methods.setLocation = function (latitude, longitude) {
//   this.location = {
//     type: "Point",
//     coordinates: [longitude, latitude],
//   };
// };

CarSchema.methods.setAvailableTimes = function (times) {
  let available_times = times;
  available_times.map(strToDate);
  function strToDate(x) {
    return {
      start: new Date(x.start),
      end: new Date(x.end),
    };
  }
  this.available_times = available_times;
};

CarSchema.methods.toAuthJSON = function () {
  return {
    owner: this.owner,
    brand: this.brand,
    model: this.model,
    license_plate: this.license_plate,
    gear_type: this.gear_type,
    year: this.year,
    energy_types: this.energy_types,
    province: this.province,
    available_times: this.available_times.map((x) => ({
      start: x.start,
      end: x.end,
    })),
    rental_price: this.rental_price,
    passenger: this.passenger,
    rating: this.rating,
    car_images: this.car_images,
  };
};

const Car = mongoose.model("Car", CarSchema);
export default Car;
