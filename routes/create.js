const Personal = require("../models/personal.js");
const Employeejob = require("../models/personal.js");

async function addEmployee(req, res) {
  try {
    const { profile, personal, employeeJob } = req.body;
    const { department, designation, managerEmployeeNo } = employeeJob;
    const { name, employeeId, companyEmail, location, primaryContactNo } =
      profile;
    const { dob } = personal;

    // const empJobData = new Employeejob({
    //   department: department,
    //   designation: designation,
    //   managerEmployeeNo: managerEmployeeNo,
    // });

    // const savedEmpJobData = await empJobData.save();

    const personalDetailsData = new Personal({
      profile: {
        name: name,
        employeeId: employeeId,
        companyEmail: companyEmail,
        location: location,
        primaryContactNo: primaryContactNo,
      },
      personal: {
        dob: dob,
      },
      employeeJob: {
        department: department,
        designation: designation,
        managerEmployeeNo: managerEmployeeNo,
      },
    });

    const savedPersonalDetailsData = await personalDetailsData.save();

    res.status(201).json({
      message: "Data created successfully",
      Employee: savedPersonalDetailsData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
}

module.exports = addEmployee;
