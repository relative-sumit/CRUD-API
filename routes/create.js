const Employee = require("../models/employeeList.js");

async function addEmployee(req, res) {
  try {
    const { profile, personal, employeeJob, asset, role } = req.body;
    const { department, designation, managerEmployeeNo } = employeeJob;
    const {
      firstName,
      middleName,
      lastName,
      companyEmail,
      location,
      primaryContactNo,
    } = profile;
    const { flat, area, landmark, pincode, city, state } = location;
    const { dob } = personal;
    const { assetId, assetName, assetModel, assetType } = asset;
    let managerEmployeeNoId;

    await Employee.findOne({ employeeId: managerEmployeeNo })
      .exec()
      .then((data) => {
        if (!data || data.length === 0) {
          res.status(404).json({ message: "Manager not found" });
          res.end();
        }
        managerEmployeeNoId = data._id;
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ message: "An error occurred, manger not found" });
      });

    const personalDetailsData = new Employee({
      profile: {
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        fullName: `${firstName} ${middleName} ${lastName}`,
        companyEmail: companyEmail,
        location: {
          flat: flat,
          area: area,
          landmark: landmark,
          pincode: pincode,
          city: city,
          state: state,
        },
        primaryContactNo: primaryContactNo,
      },
      personal: {
        dob: dob,
      },
      employeeJob: {
        department: department,
        designation: designation,
        managerEmployeeNo: managerEmployeeNoId,
      },
      asset: {
        assetId: assetId,
        assetName: assetName,
        assetModel: assetModel,
        assetType: assetType,
      },
      role: role,
    });

    const savedPersonalDetailsData = await personalDetailsData.save();

    res.status(201).json({
      message: "Data created successfully",
      Employee: savedPersonalDetailsData,
    });
  } catch (error) {
    if (error.name == "ValidationError") {
      res.status(400).send({ message: error.message });
    } else {
      console.error(error);
      res.status(500).json({ message: "An error occurred in create." });
    }
  }
}

module.exports = addEmployee;
