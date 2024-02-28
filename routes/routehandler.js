const express = require("express");
const router = express.Router();
const login = require("./login.js");
const readEmployee = require("./read.js");
const readOneEmployee = require("./readOne.js");
const addEmployee = require("./create.js");
const updateEmpjob = require("./update.js");
const deleteEmployee = require("./delete.js");
const cheskAuth = require("../middleware/checkAutherization.js");

router.get("", (req, res) => {
  res.send("This is router handler page.");
});

router.get("/login", login);

router.get("/get", cheskAuth, readEmployee);
router.get("/getOne", cheskAuth, readOneEmployee);
router.post("/add", cheskAuth, addEmployee);
router.put("/update", cheskAuth, updateEmpjob);
router.delete("/delete", cheskAuth, deleteEmployee);
module.exports = router;
