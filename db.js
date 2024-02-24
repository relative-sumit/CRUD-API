const mongoose = require("mongoose");

const url = process.env.DB_URL;
function connectDB() {
  mongoose
    .connect(url)
    .then(() => console.log("Database is connected!"))
    .catch((err) => console.error(err));
}

module.exports = connectDB;
