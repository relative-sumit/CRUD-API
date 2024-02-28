const Employee = require("../models/employeeList.js");

async function addEmployee(req, res) {
  try {
    const { profile, personal, employeeJob } = req.body;
    const { department, designation, managerEmployeeNo } = employeeJob;
    let managerEmployeeNoId;
    const { name, companyEmail, location, primaryContactNo } = profile;
    const { flat, area, landmark, pincode, city, state } = location;
    const { dob } = personal;

    await Employee.find({ employeeId: managerEmployeeNo })
      .exec()
      .then((data) => {
        if (!data || data.length === 0) {
          res.status(404).json({ message: "Manager not found" });
          res.end();
        }
        managerEmployeeNoId = data[0]._id;
      })
      .catch((err) => {
        console.error(err);
        res
          .status(500)
          .json({ message: "An error occurred, manger not found" });
      });

    const personalDetailsData = new Employee({
      profile: {
        name: name,
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
      res.status(500).json({ message: "An error occurred" });
    }
  }
}

module.exports = addEmployee;
