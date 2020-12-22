const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Transaction = new Schema ({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true},
  symbol: { type: String, required: true},
  shares: { type: Number, required: true},
  avgCost: { type: Number, required: true},
  transactionType: { type: String, required: true},
})

module.exports = mongoose.model('Transaction', Transaction);