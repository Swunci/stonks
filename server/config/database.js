const mongoose = require('mongoose');
const config = require('./environment');

mongoose.connect(config.db, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).catch(err => console.log(err));
mongoose.connection.on('error', () => {
  throw new Error(`Unable to connect to datbase: ${config.db}`);
});
mongoose.connection.once('open', () => {
  console.log("Connected to database");
});
if (config.env === 'development') {
  mongoose.set('debug', true);
}