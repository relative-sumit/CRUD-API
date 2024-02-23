const Employeejob = require('../models/employeeJob.js');

function addEmpJob(req, res){
    const newEmpjob = new Employeejob(req.body);
    newEmpjob.save()
    .then((data) =>{
        console.log(data);
        res.status(201).json({ message: "Employee job added successfully", Emp: data })
    }).catch(error =>{
        console.error("Error creating data ", error);
        res.status(500).json({ error: "Failed to add employee job" });
    })
}

module.exports = addEmpJob