const mongoose = require('mongoose');
const { getAllPortfolios } = require('../controllers/portfolioController');
const Portfolio = mongoose.model('Portfolio');
const User = mongoose.model('User');

getAll = (req) => {
  return new Promise((resolve, reject) => {
    const user = req.user;
    User.findById(user._id, 'portfolios', (err, doc) => {
      if (err) {
        return reject(err);
      }
      resolve(doc);
    })
  })
}

create = (req) => {
  return new Promise((resolve, reject) => {
    const user = req.user;
    Portfolio.create({
      owner: user._id,
      stocks: []
    })
    .then((portfolio) => {
      resolve(portfolio._id);
    })
    .catch((err) => {
      reject(err);
    })
  })
}

remove = (req) => {
  return new Promise((resolve, reject) => {
    const portfolioId = req.params.portfolioId;
    Portfolio.findByIdAndDelete(portfolioId, (err, doc) => {
      if (err) {
        return reject(err);
      }
      return resolve(doc);
    })
  })
}

module.exports = {
  getAll,
  create,
  remove,
}