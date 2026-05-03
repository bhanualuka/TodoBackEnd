const express = require("express");
const { userAuth } = require("../Middleware/userAuth");
const User = require("../Models/user");
const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    console.log(req.user);

    const { _id } = req.user._id;
    const user = await User.findById(_id);

    if (!user) {
      throw new Error("User not found");
    }

    res.json({ message: "profile Fetched Successfully", data: user });
  } catch (err) {
    res.status(400).send("Something Went Wrong" + " ", err.message);
  }
});

module.exports = profileRouter;
