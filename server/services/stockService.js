const portfolioController = require('../controllers/portfolioController');
const Stock = require('../models/Stock');

buy = (req) => {
  const owner = req.body.owner;
  const symbol = req.body.symbol;
  const shares = parseInt(req.body.shares);
  const avgCost = parseFloat(req.body.avgCost.toFixed(2));
  const filter = {'owner': owner, 'symbol': symbol};
  return new Promise((resolve, reject) => {
    Stock.findOne(filter, (err, result) => {
      if (err) {
        return reject(err);
      }
      // Owner does not own this stock 
      if (result == null) {
        const stock = new Stock({
          owner: owner,
          symbol: symbol,
          shares: shares,
          avgCost: avgCost,
          totalProfit: 0,
        });
        stock.save((err, doc) => {
          if (err) {
            return reject(err);
          }
          console.log(doc);
          return resolve();
        })
      }
      // Update the document with new shares and avgCost values
      else {
        let nAvgCost = parseFloat(((result.avgCost*result.shares + shares*avgCost) / (result.shares + shares)).toFixed(2));
        let nShares = shares + result.shares;
        let update = {$set: {'shares': nShares, 'avgCost': nAvgCost}};
        Stock.findOneAndUpdate(filter, update, {new:true}, (err, doc) => {
          if (err) {
            return reject(err);
          }
          console.log(doc);
          return resolve();
        });
      }
    });
  });
}

sell = (req) => {
  const owner = req.body.owner;
  const symbol = req.body.symbol;
  const shares = parseInt(req.body.shares);
  const avgCost = parseFloat(req.body.avgCost.toFixed(2));
  const filter = {'owner': owner, 'symbol': symbol};
  return new Promise((resolve, reject) => {
    Stock.findOne(filter, (err, result) => {
      if (err) {
        return reject(err);
      }
      if (shares > result.shares) {
        return reject(Error('Not enough shares to sell'));
      }
      const profit = result.totalProfit + (shares*avgCost) - (shares*result.avgCost);
      let update;
      if (shares == result.shares) {
        update = {$inc: {'shares': (-1*shares), 'totalProfit': profit, 'avgCost': (-1*result.avgCost)}};
      }
      else {
        update = {$inc: {'shares': (-1*shares), 'totalProfit': profit}};
      }
      Stock.findOneAndUpdate(filter, update, {new:true}, (err, doc) => {
        if (err) {
          return console.log(err);
        }
        console.log(doc);
        return resolve();
      });
    })
  });
}

module.exports = {
  buy,
  sell
}