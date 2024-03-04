const mongoose = require("mongoose");
const Counter = require("./counter.js");

const locationSchema = new mongoose.Schema({
  _id: false,
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

const emailSchema = new mongoose.Schema({
  _id: false,
  companyMail: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const validEmail = /^[a-zA-Z0-9._-]+@emp.in$/;
        return validEmail.test(v);
      },
      message: (props) =>
        `${props.value} is not in valid formate eg: example@emp.in`,
    },
  },
  personalMail: {
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
});

const phoneSchema = new mongoose.Schema({
  _id: false,
  countryCode: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const contactValid = /^\+.{3,}$/;
        return contactValid.test(v);
      },
      message: (props) => `${props.value} should start wit + sign`,
    },
  },
  primary: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const contactValid = /^\d{10}$/;
        return contactValid.test(v);
      },
      message: (props) => `${props.value} should contains only 10 digits`,
    },
  },
  backup: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const contactValid = /^\d{10}$/;
        return contactValid.test(v);
      },
      message: (props) => `${props.value} should contains only 10 digits`,
    },
  },
  emergency: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        const contactValid = /^\d{10}$/;
        return contactValid.test(v);
      },
      message: (props) => `${props.value} should contains only 10 digits`,
    },
  },
});

const contactSchema = new mongoose.Schema({
  _id: false,
  phone: phoneSchema,
  email: emailSchema,
  location: locationSchema,
});

const profileSchema = new mongoose.Schema({
  _id: false,
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
  contact: contactSchema,
});

const personalSchema = new mongoose.Schema({
  _id: false,
  dob: {
    type: Date,
    required: true,
  },
  doj: {
    type: Date,
    required: true,
  },
  doc: {
    type: Date,
    required: true,
  },
});

const employeeSchema = new mongoose.Schema({
  _id: false,
  department: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
    enum: [
      "manager",
      "team lead",
      "senior software developer",
      "software developer",
      "hr",
      "trainee",
    ],
  },
  managerDetails: {
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
const employeeDetailsSchema = new mongoose.Schema({
  employeeId: {
    type: Number,
    unique: true,
    immutable: true,
  },
  profile: profileSchema,
  personal: personalSchema,
  employee: employeeSchema,
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

employeeDetailsSchema.pre("save", function (next) {
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

module.exports = mongoose.model("Employee", employeeDetailsSchema);
