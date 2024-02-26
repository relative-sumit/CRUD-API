const mongoose = require("mongoose");
const Counter = require("./counter.js");

const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const contactValid = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
        return contactValid.test(v);
      },
      message: (props) => `${props.value} should contains only alphabets`,
    },
  },
  companyEmail: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return validEmail.test(v);
      },
      message: (props) =>
        `${props.value} is not in valid formate eg: example@gmail.com`,
    },
  },
  location: {
    type: String,
    required: true,
  },
  primaryContactNo: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const contactValid = /^(?:\+91\d{10}|\d{10})$/;
        return contactValid.test(v);
      },
      message: (props) => `${props.value}:  is not a valid 10-digit number!`,
    },
  },
});
const personalSchema = new mongoose.Schema({
  dob: {
    type: Date,
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

//personal validations
// profileSchema.path('name').validate((value) => {
//     const nameRegex = /^[a-zA-Z]+$/;
//     return nameRegex.test(value);
// }, "Name should contains only alphabets");

profileSchema.path;

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: Number,
    unique: true,
    immutable: true,
  },
  profile: [profileSchema],
  personal: [personalSchema],
  employeeJob: [empJobSchema],
});

employeeSchema.pre("save", function (next) {
  Counter.findOneAndUpdate(
    { _id: "IN1000" },
    { $inc: { employeeId: 1 } },
    { new: true, upsert: true }
  )
    .then((counter) => {
      this.employeeId = counter.employeeId;
      next();
    })
    .catch((error) => {
      console.log(error);
    });
});

module.exports = mongoose.model("Employee", employeeSchema);
