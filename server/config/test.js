module.exports = {
  env: 'test',
  db: 'mongodb://localhost:27017/stonksTestDB',
  port: 8080,
  jwtSecret: 'some-secret',
  jwtDuration: '3 hours'
}