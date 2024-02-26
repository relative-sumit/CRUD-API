const Personal = require("../models/personal.js");

function readEmployee(req, res) {
  Personal.find({})
    .exec()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ message: "An error occurred" });
    });
}

module.exports = readEmployee;
