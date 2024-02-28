const Employee = require("../models/employeeList.js");

async function addEmployee(req, res) {
  try {
    const { profile, personal, employeeJob, asset} = req.body;
    const { department, designation, managerEmployeeNo } = employeeJob;
    const { firstName, middleName, lastName, companyEmail, location, primaryContactNo } =
      profile;
    const { dob } = personal;
    const { assetId, assetName, assetModel, assetType} = asset

    const personalDetailsData = new Employee({
      profile: {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        fullName: `${firstName} ${middleName} ${lastName}`,
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
      asset: {
        assetId: assetId,
        assetName: assetName,
        assetModel: assetModel,
        assetType: assetType        
      }
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
