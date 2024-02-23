const Employeejob = require('../models/employeeJob');

function deleteEmpJob(req, res) {
    const { id } = req.params;

    Employeejob.findByIdAndDelete(id)
        .then((deletedEmpjob) => {
            if (!deletedEmpjob) {
                return res.status(404).json({ error: "Employee job not found" });
            }
            console.log(deletedEmpjob);
            res.status(200).json({ message: "Employee job deleted successfully", Emp: deletedEmpjob });
        })
        .catch((error) => {
            console.error("Error deleting data ", error);
            res.status(500).json({ error: "Failed to delete employee job" });
        });
}

module.exports = deleteEmpJob