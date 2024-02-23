const Employeejob = require('../models/employeeJob');

function updateEmpJob(req, res){
    const { id } = req.params;
    const updateDetails = req.body;

    Employeejob.findByIdAndUpdate(id, updateDetails, {new : true})
    .then((updatedData) =>{
        if(!updatedData){
            return res.status(404).json({ error: "Employee job not found" })
        }
        console.log(updatedData);
        res.status(200).json({ message: "Employee job updated successfully", Emp: updatedData });
    }).catch(error => {
        console.error("Error updating data ", error);
        res.status(500).json({ error: "Failed to update employee job" });
    });
}

module.exports = updateEmpJob