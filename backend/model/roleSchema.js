const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  role: {
    type: String,
    required: [true, "Please Enter Role"],
    unique: true,
  },
  isActive: {
    type: Boolean,
    required: [true, "Please Enter Status"],
    default: false,
  },
});
module.exports = mongoose.model("role", roleSchema);
