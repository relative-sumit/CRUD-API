require("dotenv").config();
const express = require("express");
const add = require("./routes/create.js");
const connectDB = require("./db.js");

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.post("/add", add);

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${port}`);
});
