const Employee = require("../models/employeeList");

function showTeam(req, res) {
  const empId = req.headers.empid;
  const otherTeamManagerId = req.headers.otherid;
  Employee.findOne({ employeeId: empId, present: 1 })
    .exec()
    .then((data) => {
      if (!data || data.length === 0) {
        res.status(404).json({ message: "employee not found" });
      } 
            else if (data.employee.designation === "manager" && !otherTeamManagerId) {
                Employee.find({ "employee.managerDetails": data._id })
                    .exec()
                    .then((emp) => {
                        if (!emp || emp.length === 0) {
                            res
                                .status(404)
                                .json({ message: "Don't have any employee under you" });
                        } else {
                            res
                                .status(200)
                                .json({
                                    message: `You are a manager and the employees under you are: ${emp.length}`,
                                    arr: emp,
                                });
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                        res
                            .status(500)
                            .json({ message: "error occured inside manageEmployees " });
                    });
            } else if (data.employee.designation === "manager" && otherTeamManagerId) {
                Employee.findOne({ employeeId: otherTeamManagerId, present: 1 })
                    .then(otherEmp => {
                        if (otherEmp.employee.designation === "manager" && JSON.stringify(otherEmp.employee.managerDetails) === JSON.stringify(data._id)) {
                            showTeamToHigherManager(req, res, otherEmp);
                        }
                        else if (otherEmp.employee.designation === "manager" && JSON.stringify(otherEmp.employee.managerDetails) !== JSON.stringify(data._id)) {
                            showTeamToOtherManager(req, res, otherEmp);
                        }
                        else {
                            res.status(404).json({ message: `No manager found with this Id ${otherTeamManagerId}` });
                        }
                    }).catch(error => {
                        console.log(error);
                        res.status(500).json({ message: "error occured getting other manager employee details" })
                    });
            }
          })
          .catch((error) => {
            console.error(error);
            res
              .status(500)
              .json({ message: "error occured inside manageEmployees " });
          });
      } else if (
        data.employee.designation === "manager" &&
        otherTeamManagerId
      ) {
        Employee.findOne({ employeeId: otherTeamManagerId, present: 1 })
          .then((otherEmp) => {
            if (
              otherEmp.employee.designation === "manager" &&
              JSON.stringify(otherEmp.employee.managerDetails) ===
                JSON.stringify(data._id)
            ) {
              showTeamToHigherManager(req, res, otherEmp);
            } else if (
              otherEmp.employee.designation === "manager" &&
              JSON.stringify(otherEmp.employee.managerDetails) !==
                JSON.stringify(data._id)
            ) {
              showTeamToOtherManager(req, res, otherEmp);
            } else {
              res
                .status(404)
                .json({
                  message: `No manager found with this Id ${otherTeamManagerId}`,
                });
            }
          })
          .catch((error) => {
            console.log(error);
            res
              .status(500)
              .json({
                message: "error occured getting other manager employee details",
              });
          });
      } else {
        showTeamToEmployeeUnderSameManager(req, res, data);
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({ message: "error occured outside manageEmployees " });
    });
}

function showTeamToHigherManager(req, res, emp) {
  Employee.find({ "employee.managerDetails": emp._id })
    .exec()
    .then((data) => {
      if (!data || data === 0) {
        res
          .status(404)
          .json({ message: "There is no employees under this manager" });
      } else {
        res
          .status(200)
          .json({
            message: `employees under the manager ${emp.profile.firstName} : ${data.length} `,
            arr: data,
          });
      }
    })
    .catch((error) => {
      console.log(error);
      res
        .status(500)
        .json({
          message: "error occurred to display the team to the higher manager",
        });
    });
}

function showTeamToOtherManager(req, res, emp) {
  Employee.find(
    { "employee.managerDetails": emp._id },
    "profile.fullName employeeId profile.contact.email.companyMail profile.contact.phone.primary employee.designation"
  )
    .exec()
    .then((data) => {
      if (!data || data.length === 0) {
        res
          .status(404)
          .json({ message: "Don't have any employee under this manager" });
      } else {
        res.status(200).json({
          message: `You are the manager and you are getting employees details under the manager: ${emp.profile.firstName} are ${data.length}`,
          arr: data,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({
          message: "error occured getting details of other manager employees ",
        });
    });
}

function showTeamToEmployeeUnderSameManager(req, res, data) {
  Employee.find(
    { "employee.managerDetails": data.employee.managerDetails },
    "profile.fullName employeeId profile.contact.email.companyMail profile.contact.phone.primary employee.designation"
  )
    .exec()
    .then((emp) => {
      if (!emp || emp.length === 0) {
        res
          .status(404)
          .json({
            message: `Don't have any employee under the manager ${data.profile.firstName}`,
          });
      } else {
        res.status(200).json({
          message: `You are an employee and all the employees under the same manager are: ${emp.length}`,
          arr: emp,
        });
      }
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .json({
          message:
            "An error occurred in showing the team to an employee under his/her manager.",
        });
    });
}

module.exports = showTeam;
