const Employee = require("../models/employeeList.js");

function readOneEmployee(req, res) {
  const { empId } = req.params;
  Employee.find({ employeeId: empId })
    .populate({
      path: "employeeJob.managerEmployeeNo",
      select: "employeeId profile.name",
    })
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
