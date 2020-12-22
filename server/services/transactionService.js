const Transaction = require('../models/Transaction')

saveTransaction = (req, type) => {
  const owner = req.body.owner;
  const symbol = req.body.symbol;
  const shares = parseInt(req.body.shares);
  const avgCost = parseFloat(req.body.avgCost).toFixed(2);
  const transaction = new Transaction({
    owner: owner,
    symbol: symbol,
    shares: shares,
    avgCost: avgCost,
    transactionType: type,
  })
  transaction.save((err, doc) => {
    if (err) {
      return console.log(err);
    }
    console.log(doc);
  });
}

module.exports = {
  saveTransaction
}