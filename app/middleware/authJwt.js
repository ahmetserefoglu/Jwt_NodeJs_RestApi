const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models");
const User = db.user;
verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  if (!token) {
    return res.status(403).send({
      message: "No token provided!"
    });
  }
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: "Unauthorized!"
      });
    }
    req.userId = decoded.id;
    next();
  });
};
isAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    console.log(user)
    if (user.role === "admin") {
      next();
      return;
    }
    res.status(403).send({
      message: "Require Admin Role!"
    });
    return;
  });
};
isUser = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    console.log(user)
    if (user.role === "user") {
      next();
      return;
    }
    res.status(403).send({
      message: "Require User Role!"
    });
    return;
  });
};
isUserOrAdmin = (req, res, next) => {
  User.findByPk(req.userId).then(user => {
    if (user.role === "user") {
      next();
      return;
    }
    if (user.role === "admin") {
      next();
      return;
    }
    res.status(403).send({
      message: "Require User or Admin Role!"
    });
  });
};
const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
  isUser: isUser,
  isUserOrAdmin:isUserOrAdmin
};
module.exports = authJwt;