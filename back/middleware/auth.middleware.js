const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

exports.checkUser = (req, res, next) => {
  const token = req.cookies.jwt;

  if (token) {
    jwt.verify(token, process.env.TOKEN_KEY, async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        res.cookie("jwt", "", { maxAge: 1 });
        next();
      } else {
        let user = await User.findById(decodedToken.userId);
        res.locals.user = user;
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

exports.requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.TOKEN_KEY, (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        console.log(decodedToken.userId);
        next();
      }
    });
  } else {
    console.log("Aucun token");
  }
};
