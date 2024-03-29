const Employee = require("../models/employeeList.js");

function readEmployee(req, res) {
  Employee.find({ present: 1 })
    .populate({
      path: "employee.managerDetails",
      select: "employeeId profile.fullName",
    })
    .exec()
    .then((data) => {
      res.status(200).json({ Length: data.length, data: data });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "An error occurred in read" });
    });
}

module.exports = readEmployee;
