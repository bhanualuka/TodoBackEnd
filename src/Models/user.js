const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      minlegth: 3,
      maxlength: 20,
      require: true,
    },
    lastName: {
      type: String,
      minlegth: 3,
      maxlength: 20,
      require: true,
    },

    emailId: {
      type: String,
      require: true,
      unique: true,

      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is not valid");
        }
      },
    },

    password: {
      type: String,
      require: true,
      unique: true,
    },

    age: {
      type: Number,
      min: 18,
      max: 100,
    },

    gender: {
      type: String,
      enum: {
        values: ["Male", "Female", "Others"],
        message: "{VALUE} is  not a valid gender type",
      },
      isLowercase: true,
      trim: true,
    },

    about: {
      type: String,
      default: "Default about",
    },

    photoUrl: {
      type: String,
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Enter Strong URl");
        }
      },
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("User", userSchema);
