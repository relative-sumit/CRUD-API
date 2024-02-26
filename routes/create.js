const Employee = require("../models/employeeList.js");

async function addEmployee(req, res) {
  try {
    const { profile, personal, employeeJob } = req.body;
    const { department, designation, managerEmployeeNo } = employeeJob;
    const { name, companyEmail, location, primaryContactNo } =
      profile;
    const { dob } = personal;

    const personalDetailsData = new Employee({
      profile: {
        name: name,
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
    if(error.name == 'ValidationError'){
      res.status(400).send({ message: error.message });
    }
    else{
      console.error(error);
      res.status(500).json({ message: "An error occurred" });
    }

  }
}

module.exports = addEmployee;
