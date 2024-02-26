const mongoose = require('mongoose');
const moment = require('moment')

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                const contactValid = /^[a-zA-Z]+$/;
                return contactValid.test(v);
            },
            message: props => `${props.value} should contains only alphabets`
        }
    },
    companyEmail: {
        type: String,
        required: true,
        validate: {
            validator: function(v){
                const validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return validEmail.test(v);
            },
            message: props => `${props.value} is not in valid formate eg: example@gmail.com`
        }
    },
    location: {
        type: String,
        required: true
    },
    primaryContactNo: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                // const contactValid = /^\d{10}$/;
                return v.length === 10 || v.length === 13;
            },
            message: props => `${props.value}:  is not a valid 10-digit number!`
        }
    }
});
const personalSchema = new mongoose.Schema({
    dob: {
        type: Date,
        required: true
    }
});

const empJobSchema = new mongoose.Schema({
    department: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    managerEmployeeNo: {
        type: String,
        required: true
    }

});

//personal validations
// profileSchema.path('name').validate((value) => {
//     const nameRegex = /^[a-zA-Z]+$/;
//     return nameRegex.test(value);
// }, "Name should contains only alphabets");

profileSchema.path

const personalDetailsSchema = new mongoose.Schema({
    employeeId: {
        type: String,
        default: 'IN1000'
    },
    profile: [profileSchema],
    personal: [personalSchema],
    employeeJob: [empJobSchema]
});

personalDetailsSchema.pre("save", function (next) {
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

module.exports = mongoose.model('Personal', personalDetailsSchema)
