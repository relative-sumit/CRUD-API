require('dotenv').config();
const express = require('express');
const app = express(); 
const mongoConnect = require('./db.js');
const addEmpJob = require('./routes/create.js');
const updateEmpjob = require('./routes/update.js');
const deleteEmpJob = require('./routes/delete.js');
const port = process.env.PORT;

app.use(express.json());
app.get('', (req, res)=>{
    res.send("hello from express");
});

app.post('/add', addEmpJob);
app.put('/update/:id', updateEmpjob);
app.delete('/delete/:id', deleteEmpJob);

app.use('*', (req, res)=>{
    res.status(404).send("No such route found");
});

app.listen(port, ()=>{
    mongoConnect.dbConnection();
    console.log(`server started at ${port}`);
});