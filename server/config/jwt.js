const config = require('./environment');
const jwt = require('express-jwt');

const authenticate = jwt({
  secret: config.jwtSecret,
  algorithms: ['sha1', 'RS256', 'HS256'],
});


module.exports = authenticate;