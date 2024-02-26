const Personal = require("../models/personal.js");

function readOneEmployee(req, res) {
  const { empId } = req.params;
  Personal.find({ "profile.employeeId": empId })
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
