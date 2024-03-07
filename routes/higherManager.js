const Employee = require('../models/employeeList');

async function getHierarchy(req, res) {
    const managerId = req.headers.managerid
    const employees = [];
    await Employee.findOne({ employeeId: managerId, present: 1 })
        .exec()
        .then(async data => {
            if (!data || data === 0) {
                res.status(400).json({ message: 'No employee with this Id' })
            }
            else {
                
                await recursive(data, employees);
                res.status(200).json({ message: 'Employee hierarchy', arr: employees });

            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({ message: 'Error getting ManagerId' })
        });

}
// calling employees recursively
async function recursive(empObj, employees) {
    await Employee.find({ "employee.managerDetails": empObj._id, present: 1 })
        .populate({
            path: "employee.managerDetails",
            select: "employeeId profile.fullName",
        })
        .exec()
        .then(async emp => {
            if (!emp || emp === 0) {
                console.log(`No employee under ${emp.employeeId}`);
            }
            else {
                for (const employee of emp) {
                    employees.push(employee);
                    if (employee.employee.designation === 'manager') {
                        await recursive(employee, employees);
                    }
                }
            }
            
        }).catch(err => {
            console.log(err);
            res.json({ message: 'error occured while getting employee details' });
        });
}

module.exports = getHierarchy