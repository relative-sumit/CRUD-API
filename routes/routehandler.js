const express = require("express");
const router = express.Router();
const login = require("./login.js");
const readEmployee = require("./read.js");
const readOneEmployee = require("./readOne.js");
const addEmployee = require("./create.js");
const updateEmpjob = require("./update.js");
const deleteEmployee = require("./delete.js");
const checkAuth = require("../middleware/checkAutherization.js");
const showTeam = require('./showTeam.js');


router.get("", (req, res) => {
  res.send("This is router handler page.");
});

router.get("/login", login);

router.get("/get", checkAuth, readEmployee);
router.get("/getOne", checkAuth, readOneEmployee);
router.post("/add", checkAuth, addEmployee);
router.put("/update", checkAuth, updateEmpjob);
router.delete("/delete", checkAuth, deleteEmployee);
router.get("/show-team", showTeam);



module.exports = router;
