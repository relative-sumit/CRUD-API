const mongoose = require("mongoose");

const empjob = new mongoose.Schema({
  department: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
  managerEmployeeNo: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Employeejob", empjob);
