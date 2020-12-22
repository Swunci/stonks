const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');
const config = require('../config/environment');

authenticate = (req, res, next) => {
  User.findOne({
      username: req.body.username
    })
    .exec()
    .then((user) => {
      if (!user) {
        return next();
      }
      user.comparePassword(req.body.password, (err, isMatch) => {
        if (isMatch) {
          req.user = user;
          next();
        }
        else {
          next();
        }
      });
    })
    .catch((err) => {
      next(err)
    });
}

generateToken = (req, res, next) => {
  if (!req.user) {
    return next();
  }
  const jwtPayload = {
    id: req.user._id
  }
  const jwtData = {
    expiresIn: config.jwtDuration
  }
  const secret = config.jwtSecret;
  req.token = jwt.sign(jwtPayload, secret, jwtData);
  next();
}

respondJWT = (req, res) => {
  if (!req.user) {
    res.status(401).json({
      error: 'Unauthorized'
    });
  }
  else {
    res.status(200).json({
      token: req.token
    });
  }
}

module.exports = {
  authenticate,
  generateToken,
  respondJWT
}