const Employee = require("../models/employeeList.js");

function updateEmpJob(req, res) {
  const empId = req.headers.empid;
  const updateDetails = req.body;
  (updateDetails.profile.fullName = `${updateDetails.profile.firstName} ${updateDetails.profile.middleName} ${updateDetails.profile.lastName}`),
    Employee.findOneAndUpdate({ employeeId: empId }, updateDetails, {
      new: true,
      runValidators: true,
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
        if (error.name == "ValidationError") {
          res.status(400).send({ message: error.message });
        } else {
          console.error("Error updating data ", error);
          res.status(500).json({ error: "Failed to update employee" });
        }
      });
}

module.exports = updateEmpJob;
