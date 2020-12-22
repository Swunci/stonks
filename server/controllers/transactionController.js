const transactionService = require('../services/transactionService');
const stockService = require('../services/stockService');
const transactionType = {BUY: 'BUY', SELL: 'SELL'};

buyStock = (req, res) => {
  stockService.buy(req)
    .then(() => {
      transactionService.saveTransaction(req, transactionType.BUY);
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
}

sellStock = (req, res) => {
  stockService.sell(req)
    .then(()=> {
      transactionService.saveTransaction(req, transactionType.SELL);
      res.end();
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
}

module.exports = {
  buyStock,
  sellStock,
}


