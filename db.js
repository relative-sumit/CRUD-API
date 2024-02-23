const mongoose = require('mongoose'); 
let url = process.env.DB_URL;

function dbConnection(){
    mongoose.connect(url)
    .then(() => {
        console.log("db is connected");
    }).catch(error => {
        console.log("Error connecting to db", error);
    });
}

module.exports = { dbConnection }