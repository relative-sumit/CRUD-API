const Employee = require("../models/employeeList.js");

function readOneEmployee(req, res) {
  const empId = req.headers.empid;
  Employee.find({ "employeeId": empId })
    .exec()
    .then((data) => {
      if (!data || data.length === 0) {
        return res.status(404).json({ message: "Employee not found" });
      }
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    });
}

module.exports = readOneEmployee;
