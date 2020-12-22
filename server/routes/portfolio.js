const express = require('express');
const portfolioController = require('../controllers/portfolioController');
const stockRouter = require('../routes/stock');

const router = express.Router({mergeParams: true});


router.use('/:portfolioId/stocks', stockRouter)

router.route('/')
  .get(portfolioController.getAllPortfolios)
  .post(portfolioController.createPortfolio)

router.route('/:portfolioId')
  .put(portfolioController.updatePortfolio)
  .delete(portfolioController.removePortfolio)

module.exports = router;