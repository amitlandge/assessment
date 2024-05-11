const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Password"],

    select: false,
  },
  token: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "USER",
  },
});
module.exports = mongoose.model("user", userSchema);
