const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Stock = new Schema ({
  owner: { type: mongoose.Schema.Types.ObjectID, ref: 'User', required: true},
  symbol: { type: String, required: true},
  shares: { type: Number, required: true},
  avgCost: { type: Number, required: true},
  totalProfit: { type: Number, required: true}
})

module.exports = mongoose.model('Stock', Stock);