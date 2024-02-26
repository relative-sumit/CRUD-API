require('dotenv').config();

const express = require('express');
const app = express(); 
const mongoConnect = require('./db.js');
const readEmployee = require('./routes/read.js');
const readOneEmployee = require('./routes/readOne.js');
const addEmployee = require('./routes/create.js');
const updateEmpjob = require('./routes/update.js');
const deleteEmployee = require('./routes/delete.js');
const port = process.env.PORT;

app.use(express.json());
app.get('', (req, res)=>{
    res.send("Welcome to main page");
});

app.get('/get', readEmployee);
app.get('/getOne/:empId', readOneEmployee);
app.post('/add', addEmployee);
app.put('/update/:empId', updateEmpjob);
app.delete('/delete/:empId', deleteEmployee);

app.use('*', (req, res)=>{
    res.status(404).send("No such route found");
});

app.listen(port, ()=>{
    mongoConnect.dbConnection();
    console.log(`Server is running on http://localhost:${port}`);
});