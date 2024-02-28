require('dotenv').config();

const express = require('express');
const app = express(); 
const mongoConnect = require('./db.js');
const empCrud = require('./routes/routehandler.js');

const port = process.env.PORT;

app.use(express.json());

// app.use(express.urlencoded({extended: false}));

app.get('', (req, res)=>{
    res.send("Welcome to main page");
});
app.use('/employee', empCrud);


app.use('*', (req, res)=>{
    res.status(404).send("No such route found");
});

app.listen(port, ()=>{
    mongoConnect.dbConnection();
    console.log(`Server is running on http://localhost:${port}`);
});