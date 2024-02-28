const express = require("express");
const router = express.Router();
const login = require('./login.js');
const readEmployee = require("./read.js");
const readOneEmployee = require("./readOne.js");
const addEmployee = require("./create.js");
const updateEmpjob = require("./update.js");
const deleteEmployee = require("./delete.js");

router.get("", (req, res) => {
  res.send("This is router handler page.");
});


router.get("/valid-user", login);

router.get("/get", readEmployee);
router.get("/getOne", readOneEmployee);
router.post("/add", addEmployee);
router.put("/update", updateEmpjob);
router.delete("/delete", deleteEmployee);

module.exports = router;
