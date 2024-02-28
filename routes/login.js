const Employee = require('../models/employeeList');
const jwt = require('jsonwebtoken');

function adminLogin(req, res){
    const empId = req.headers.empid;
    Employee.findOne({ employeeId: empId, present: 1, role: "admin" })
    .exec()
    .then(data =>{
        if(!data || data.length === 0){
            res.status(404).json({ message: "Your are not valid user to change the employee details" });
        }else{
            const payload = {
                employeeId: empId
            };
            const secretKey = "7validationforadmin7+";
            const token = jwt.sign(payload, secretKey, { expiresIn: '15m' });
            res.status(200).json({message: "token generated", token: token});
        }
    }).catch(error => {
        console.error(error);
        res.status(500).json({ message: "An error occurred in login" });
    });
}

module.exports = adminLogin