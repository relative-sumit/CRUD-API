const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: true,
  },
  employeeId: {
    type: Number,
    default: 1000,
  },
});

module.exports = mongoose.model("counter", counterSchema);
