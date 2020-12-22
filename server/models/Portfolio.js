const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const Portfolio = new Schema ({
  owner: { type: Schema.Types.ObjectID, ref: 'User', required: true},
  stocks: { type: [{type: Schema.Types.ObjectID, ref: 'Stock'}] },
});

module.exports = mongoose.model('Portfolio', Portfolio);