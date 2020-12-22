module.exports = {
  env: 'development',
  db: 'mongodb://localhost:27017/stonksDB',
  port: 8080,
  jwtSecret: 'some-secret',
  jwtDuration: '3 hours'
};