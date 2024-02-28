const Employee = require("../models/employeeList.js");

function deleteEmployee(req, res) {
  const empId = req.headers.empid;

  // Employee.findOneAndDelete({ "employeeId": empId })
  //   .then((deletedEmp) => {
  //     if (!deletedEmp) {
  //       return res.status(404).json({ error: "Employee not found" });
  //     }
  //     res
  //       .status(200)
  //       .json({
  //         message: "Employee deleted successfully",
  //         Emp: deletedEmp,
  //       });
  //   })
  //   .catch((error) => {
  //     console.error("Error deleting data ", error);
  //     res.status(500).json({ error: "Failed to delete employee" });
  //   });
  Employee.findOneAndUpdate({ "employeeId": empId }, {"deleted": 1})
    .then((deletedEmp) => {
      if (!deletedEmp) {
        return res.status(404).json({ error: "Employee not found" });
      }
      res
        .status(200)
        .json({
          message: "Employee deleted successfully",
          Emp: deletedEmp,
        });
    })
    .catch((error) => {
      console.error("Error deleting data ", error);
      res.status(500).json({ error: "Failed to delete employee" });
    });
}

module.exports = deleteEmployee;
