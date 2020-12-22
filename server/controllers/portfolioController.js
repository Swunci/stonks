const portfolioService = require('../services/portfolioService');
const userService = require('../services/userService');

getAllPortfolios = (req, res) => {
  portfolioService.getAll(req)
    .then((portfolios) => {
      res.json(portfolios);
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    })
}

createPortfolio = (req, res) => {
  portfolioService.create(req)
    .then((portfolioId) => {
      userService.addPortfolio(req, portfolioId)
        .then((doc) => {
          res.json({
            _id :portfolioId,
            user_id: doc._id,
          });
        });
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
    });
}

updatePortfolio = (req, res) => {

}

removePortfolio = (req, res, next) => {
  portfolioService.remove(req)
    .then(() => {
      userService.removePortfolio(req)
        .then(() => {
          res.sendStatus(200);
        })
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(400);
      next(err);
    })
}

module.exports = {
  getAllPortfolios,
  createPortfolio,
  updatePortfolio,
  removePortfolio,
}

