const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;

async function cheskAuth(req, res, next) {
  const bearerHeader = req.headers.authorization;
 
  if (bearerHeader !== undefined) {
    const token = bearerHeader.split(" ")[1];

    jwt.verify(token, secretKey, (err, authData) => {
      if (err) {
        res
          .status(500)
          .json({ message: "Invalid token, please check the jwt token!" });
      } else {
        console.log(authData);
        next();
      }
    });
  } else {
    res.status(500).json({ message: "Add authorization in the headers!" });
  }
}

module.exports = cheskAuth;
