require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mongoConnect = require("./db.js");
const empCrud = require("./routes/routehandler.js");
const initSocketIO = require("./middleware/socketIo.js");
const app = express();
const port = process.env.PORT;
const server = require("http").createServer(app);

app.use(express.json());
app.use(cors())
const io = initSocketIO(server)


app.get("", (req, res) => {
  res.send("Welcome to main page");
});
app.use("/employee", empCrud);

app.use("*", (req, res) => {
  res.status(404).send("No such route found");
});

server.listen(port, () => {
  mongoConnect.dbConnection();
  console.log(`Server is running on http://localhost:${port}`);
});
