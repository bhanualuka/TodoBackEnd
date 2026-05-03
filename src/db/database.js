const mongoose = require("mongoose");
const { MAIN_URL } = require("../utilis/Constants");

const ConnectDb = async () => {
  await mongoose.connect(MAIN_URL);
};

module.exports = { ConnectDb };
