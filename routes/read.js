const Employee = require("../models/employeeList.js");

function readEmployee(req, res) {
  Employee.find({ present: 1 })
    .populate({
      path: "employeeJob.managerEmployeeNo",
      select: "employeeId profile.name",
    })
    .exec()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "An error occurred in read" });
    });
}

module.exports = readEmployee;
