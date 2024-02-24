const Empjob = require("../models/employmentjob");

function addEmployee(req, res) {
  const newEmp = new Empjob(req.body);
  newEmp
    .save()
    .then((data) => {
      console.log(data);
      res.status(200).json({message: "Employee added successfully...", Data: data})
    })
    .catch((error) => {
        console.error(error);
        res.status(500).json({error: "Eror! Employee not added..."})
    });
}

module.exports = addEmployee;
