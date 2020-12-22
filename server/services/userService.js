const mongoose = require('mongoose');
const User = mongoose.model('User');

loadUser = (req, username) => {
  return new Promise((resolve, reject) => {
    User.findOne({'username': username,})
      .then((user) => {
        req.user = user;
        if (user == null) {
          return reject();
        }
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

createUser = (req) => {
  return new Promise((resolve, reject) => {
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
    })
    .then((savedUser) => {
      resolve(savedUser);
    })
    .catch((err) => {
      reject(err);
    });
  })
}

updateUser = (req) => {
  return new Promise((resolve, reject) => {
    const user = req.user;
    if (user == null) {
      reject(404);
    }
    Object.assign(user, req.body);
    user.save()
      .then((savedUser) => {
        resolve(savedUser);
      })
      .catch((err) => {
        reject(err);
      });
  })
}

removeUser = () => {

}

addPortfolio = (req, portfolioId) => {
  return new Promise((resolve, reject) => {
    const user = req.user;
    const update = {$push: {portfolios: portfolioId}};
    User.findByIdAndUpdate({'_id': user._id}, update, {new:true}, (err, doc) => {
      if (err) {
        return reject(err);
      }
      resolve(doc);
    });
  });
}

removePortfolio = (req) => {
  return new Promise((resolve, reject) => {
    const user = req.user;
    const portfolioId = req.params.portfolioId;
    const update = {$pull: {portfolios: portfolioId}};
    User.findByIdAndUpdate({'_id': user._id}, update, (err, doc) => {
      if (err) {
        return reject(err);
      }
      resolve(doc);
    });
  });
}

module.exports = {
  loadUser,
  createUser,
  updateUser,
  removeUser,
  addPortfolio,
  removePortfolio,
}