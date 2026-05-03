const jwt = require("jsonwebtoken");
const User = require("../Models/user");

const userAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("token:" + token);

    if (!token) {
      res.status(401).send("Unauthorized User");
    }

    const verify = await jwt.verify(token, "TODO@08");

    const { _id } = verify;

    const user = await User.findById(_id);

    req.user = user;

    next();
  } catch (err) {
    res.status(400).send("Something went Wrong" + err.message);
  }
};

module.exports = { userAuth };
