const mongoose = require("mongoose");

let url = process.env.DB_URL;

function dbConnection() {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Database connected successfully...");
    })
    .catch((error) => {
      console.log("Error connecting to db", error);
    });
}

module.exports = { dbConnection };
