const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        default: 'IN1000'
    },
    companyEmail: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    }, 
    primaryContactNo: {
        type: String,
        required: true
    }
});
const personalSchema = new mongoose.Schema({
    dob : {
        type: String,
        required: true
    }
});

const empJobSchema = new mongoose.Schema({
    department:{
        type: String,
        required: true
    },
    designation:{
        type: String,
        required: true
    },
    managerEmployeeNo:{
        type: String,
        required: true
    }

});

const personalDetailsSchema = new mongoose.Schema({
    profile: [profileSchema],
    personal: [personalSchema],
    employeeJob: [empJobSchema]
});

module.exports = mongoose.model('Personal', personalDetailsSchema)