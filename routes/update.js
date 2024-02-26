const Employee = require("../models/employeeList.js");

function updateEmpJob(req, res) {
  const { empId } = req.params;
  const updateDetails = req.body;

  Employee.findOneAndUpdate({ "employeeId": empId }, updateDetails, {
    new: true,
  })
    .then((updatedData) => {
      if (!updatedData) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res.status(200).json({
        message: "Employee updated successfully",
        Emp: updatedData,
      });
    })
    .catch((error) => {
      console.error("Error updating data ", error);
      res.status(500).json({ error: "Failed to update employee" });
    });
}

module.exports = updateEmpJob;
