const express = require("express");
const User = require("../Models/user");
const authRouter = express.Router();
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieparser = require("cookie-parser");

authRouter.post("/signUp", async (req, res) => {
  try {
    const AllowedFields = [
      "firstName",
      "lastName",
      "emailId",
      "password",
      "age",
      "photoUrl",
      "about",
      "gender",
      "skills",
    ];

    const isAllowedStatus = Object.keys(req.body).every((k) =>
      AllowedFields.includes(k),
    );

    if (!isAllowedStatus) {
      throw new Error("Invalid Status");
    } else {
      const { firstName, lastName, emailId, password, age, photoUrl, about } =
        req.body;

      if (!validator.isStrongPassword(password)) {
        throw new Error("Password must be Strong");
      }

      if (!validator.isEmail(emailId)) {
        throw new Error("Enter correct Format Email");
      }

      const hashPassword = await bcrypt.hash(password, 10);

      const user = new User({
        firstName,
        lastName,
        emailId,
        password: hashPassword,
        photoUrl,
        age,
        about,
      });

      const savedUser = await user.save();

      const token = jwt.sign({ _id: savedUser._id }, "TODO@08");
      res.cookie(
        "token",
        token,
        /*  {
        httpOnly: true,
        sameSite: "strict",
        secure: (process.env.NODE_ENV = "production"),
      } */
      );

      res.send({ message: "User SignedUp successfully", Userdata: savedUser });
    }
  } catch (err) {
    res.send(err.message);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    console.log(req.body);

    const { emailId, password } = req.body;

    const existing_User = await User.findOne({ emailId: emailId });
    console.log(existing_User);

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existing_User.password,
    );

    if (isPasswordCorrect && existing_User.emailId == emailId) {
      const token = jwt.sign({ _id: existing_User._id }, "TODO@08");
      res.cookie(
        "token",
        token,
        /*  {
        httpOnly: true,
        sameSite: "strict",
        secure: (process.env.NODE_ENV = "production"),
      } */
      );

      res.send({
        message: "User loggedIn successfully",
        Userdata: existing_User,
      });
    } else {
      throw new Error("Invalid credentials");
    }
  } catch (err) {
    res.send(err.message);
  }
});

authRouter.post("/logout", async (req, res) => {
  res.clearCookie("token");
  res.json({ message: "User logged out Successfully" });
});

module.exports = authRouter;
