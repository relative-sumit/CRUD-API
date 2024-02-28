
const express = require('express');
const router = express.Router();
const readEmployee = require('./read.js');
const readOneEmployee = require('./readOne.js');
const addEmployee = require('./create.js');
const updateEmpjob = require('./update.js');
const deleteEmployee = require('./delete.js');


router.get('', (req, res)=>{
    res.send("This is router handler page.")
});

router.get('/get', readEmployee);
router.get('/getOne/:empId', readOneEmployee);
router.post('/add', addEmployee);
router.put('/update/:empId', updateEmpjob);
router.delete('/delete/:empId', deleteEmployee);

module.exports = router