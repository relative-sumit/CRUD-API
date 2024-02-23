const mongoose = require('mongoose');

const profileData = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    employeeId: {
        type: String,
        required: true
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
const personalData = new mongoose.Schema({
    dob : {
        type: String,
        required: true
    }
});

const personalDetails = new mongoose.Schema({
    profile: [profileData],
    personal: [personalData]
});

module.exports = mongoose.model('Personal', personalDetails)