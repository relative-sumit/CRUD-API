const mongoose = require("mongoose");
const Counter = require("./counter.js");

const locationSchema = new mongoose.Schema({
  flat: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  landmark: {
    type: String,
    required: true,
  },
  pincode: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const contactValid = /^\d{6}$/;
        return contactValid.test(v);
      },
      message: (props) => `${props.value} is not a valid pincode`,
    },
  },
  city: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
});

const profileSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const contactValid = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
        return contactValid.test(v);
      },
      message: (props) =>
        `${props.value} should contains only alphabets and no white spaces before and after`,
    },
  },
  middleName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const contactValid = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
        return contactValid.test(v);
      },
      message: (props) =>
        `${props.value} should contains only alphabets and no white spaces before and after`,
    },
  },
  lastName: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const contactValid = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
        return contactValid.test(v);
      },
      message: (props) =>
        `${props.value} should contains only alphabets and no white spaces before and after`,
    },
  },
  fullName: {
    type: String,
    required: true,
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
  location: locationSchema,
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
    enum: ["Manager", "HR", "Software Engineer", "Senior Software Engineer", "Trainee", "Technical Lead", "Tester"]
  },
  managerEmployeeNo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
  },
});

const assetSchema = new mongoose.Schema({
  assetId: {
    type: String,
    required: true,
  },
  assetName: {
    type: String,
    required: true,
  },
  assetModel: {
    type: String,
    required: true,
  },
  assetType: {
    type: String,
    required: true,
  },
});
const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: Number,
    unique: true,
    immutable: true,
  },
  profile: profileSchema,
  personal: personalSchema,
  employeeJob: empJobSchema,
  asset: assetSchema,
  present: {
    type: Number,
    default: 1,
    enum: [0, 1],
  },
  role: {
    type: String,
    required: true,
    enum: ["user", "admin"],
  },
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
