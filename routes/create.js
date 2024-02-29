const Employee = require("../models/employeeList.js");

async function addEmployee(req, res) {
  try {
    const { profile, personal, employee, asset, role } = req.body;
    const { department, designation, managerDetails } = employee;
    const { firstName, middleName, lastName, contact } = profile;
    const { phone, email, location } = contact;
    const { countryCode, primary, backup, emergency } = phone;
    const { companyMail, personalMail } = email;
    const { flat, area, landmark, pincode, city, state } = location;
    const { dob, doj, doc } = personal;
    const { assetId, assetName, assetModel, assetType } = asset;
    let managerEmployeeNoId;

    await Employee.findOne({ employeeId: managerDetails })
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
        contact: {
          phone: {
            countryCode: countryCode,
            primary: primary,
            backup: backup,
            emergency: emergency,
          },
          email: {
            companyMail: companyMail,
            personalMail: personalMail,
          },
          location: {
            flat: flat,
            area: area,
            landmark: landmark,
            pincode: pincode,
            city: city,
            state: state,
          },
        },
      },
      personal: {
        dob: dob,
        doj: doj,
        doc: doc,
      },
      employee: {
        department: department,
        designation: designation,
        managerDetails: managerEmployeeNoId,
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
