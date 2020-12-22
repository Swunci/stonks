const express = require('express');
const config = require('./server/config/environment');
const app = express();
const morgan = require('morgan');
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}
app.use(express.static('public'));
app.use(express.json());


require('./server/config/database');
require('./startup/models');
require('./startup/routes')(app);

app.use((err, req, res, next) => {
  res.status(err.status)
    .json({
      status: err.status,
      message: err.message
    });
});

app.server = app.listen(config.port, () => {
  console.log(`Listening on port ${config.port}... ${config.env}`);
});

module.exports = app;
