const mongoose = require('mongoose');
const User = mongoose.model('User');
const userService = require('../services/userService');


loadUser = (req, res, next, username) => {
  userService.loadUser(req, username)
    .then(() => {
      next();
    })
    .catch((err) => {
      if (!err) {
        res.json(404);
        return next();
      }
      next(err);
    })
}

createUser = (req, res) => {
  userService.createUser(req)
    .then((savedUser) => {
      res.json(savedUser);
    })
    .catch((err) => {
      res.sendStatus(400);
    });
}

getUser = (req, res) => {
  return res.json(req.user);
} 

updateUser = (req, res) => {
  userService.updateUser(req)
    .then((savedUser) => {
      res.json(savedUser);
    })
    .catch((err) => {
      if (err == 404) {
        return res.sendStatus(404);
      }
      res.sendStatus(500);
    })
}

removeUser = (req, res, next) => {
  const user = req.user;
  user.remove()
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      res.sendStatus(400);
      next(err);
    });
}


module.exports = {
  loadUser,
  createUser,
  getUser,
  updateUser,
  removeUser,
}