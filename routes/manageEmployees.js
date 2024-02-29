const Employee = require('../models/employeeList');

function employeesUnderManager(req, res) {
    const empId = req.headers.empid
    Employee.findOne({ employeeId: empId, present: 1 })
        .exec()
        .then(data => {
            if (!data || data.length === 0) {
                res.status(404).json({ message: "employee not found" })
            } else if (data.employeeJob.designation === "Manager") {
                Employee.find({ 'employeeJob.managerEmployeeNo': data._id })
                    .exec()
                    .then(emp => {
                        if (!data || data.length === 0) {
                            res.status(404).json({ message: "Don't have any employee under you" })
                        } else {
                            res.status(200).json({ message: "Employees under the manager", arr: emp });
                        }
                    }).catch(error => {
                        console.error(error);
                        res.status(500).json({ message: "error occured inside manageEmployees " });
                    });
            }
            else {
                Employee.find({ 'employeeJob.managerEmployeeNo': data.employeeJob.managerEmployeeNo }, "profile.fullName employeeId profile.companyEmail profile.primaryContactNo employeeJob.designation")
                    .exec()
                    .then(emp => {
                        if (!data || data.length === 0) {
                            res.status(404).json({ message: "Don't have any employee under you" })
                        } else {
                            res.status(200).json({ message: "Employees under the manager", arr: emp });
                        }
                    }).catch(error => {
                        console.error(error);
                        res.status(500).json({ message: "error occured inside manageEmployees " });
                    });
            }
        }).catch(error => {
            console.error(error);
            res.status(500).json({ message: "error occured outside manageEmployees" });
        });
}

module.exports = employeesUnderManager