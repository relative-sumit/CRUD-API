const mongoose = require("mongoose");
const Counter = require("./counter.js");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  companyEmail: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  primaryContactNo: {
    type: String,
    required: true,
  },
});
const personalSchema = new mongoose.Schema({
  dob: {
    type: String,
    required: true,
  },
});

const empJobSchema = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  managerEmployeeNo: {
    type: Number,
    required: true,
  },
});

const personalDetailsSchema = new mongoose.Schema({
  employeeId: {
    type: Number,
    unique: true,
  },
  profile: [profileSchema],
  personal: [personalSchema],
  employeeJob: [empJobSchema],
});

personalDetailsSchema.pre("save", function (next) {
  Counter.findOneAndUpdate(
    { _id: "IN1000" },
    { $inc: { employeeId: 1 } },
    { upsert: true, new: true }
  )
    .then((counter) => {
      this.employeeId = counter.employeeId;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = mongoose.model("Personal", personalDetailsSchema);
