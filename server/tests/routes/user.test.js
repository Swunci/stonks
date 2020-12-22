const request = require('supertest-as-promised');
const chai = require('chai');
const sinon = require('sinon');
const config = require('../../config/environment');
const app = require('../../../app');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const userService = require('../../services/userService');

const expect = chai.expect;

describe('## User API Tests', () => {
  // Test suite contents here
  let token;
  const username = 'testuser';
  const password = 'password';
  const email = 'test@email.com';

  before((done) => {
    sinon.stub(console, 'log');
    done();
  });

  after(async() => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany();
    }
    app.server.close(() => {
      mongoose.connection.close();
    });
    sinon.restore();
  });

  describe('### POST api/users', () => {

    after((done) => {
      request(app)
      .post('/api/auth/token')
      .send({
        username: username,
        password: password,
      })
      .then((res) => {
        expect(res.body.token).to.exist;
        token = res.body.token;
        done();
      })
      .catch(done);
    });

    afterEach((done) => {
      sinon.restore();
      done();
    })

    it('should return the created user successfully', (done) => {
      request(app)
        .post('/api/users')
        .send({
          username: username,
          password: password,
          email: email,
        })
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body.username).to.equal(username);
          expect(res.body.password).to.exist;
          expect(res.body.email).to.equal(email);
          expect(res.body._id).to.exist;
          expect(res.body.portfolios.length).to.equal(0);
          done();
        })
        .catch(done);
    });
    it ('should return 400 bad request if username is missing', (done) => {
      sinon.stub(User, 'create').rejects({});
      request(app)
        .post('/api/users')
        .send({
          password: password,
          email: email,
        })
        .then((res) => {
          expect(res.statusCode).to.equal(400);
          done();
        })
        .catch(done);
    });
    it ('should return 400 bad request if password is missing', (done) => {
      sinon.stub(User, 'create').rejects({});
      request(app)
        .post('/api/users')
        .send({
          username: username,
          email: email,
        })
        .then((res) => {
          expect(res.statusCode).to.equal(400);
          done();
        })
        .catch(done);
    });
    it ('should return 400 bad request if email is missing', (done) => {
      sinon.stub(User, 'create').rejects({});
      request(app)
        .post('/api/users')
        .send({
          username: username,
          password: password,
        })
        .then((res) => {
          expect(res.statusCode).to.equal(400);
          done();
        })
        .catch(done);
    });
  
  });

  describe('### GET api/users/:username', () => {
    it('should return the user information if user exists', (done) => {
      request(app)
        .get(`/api/users/${username}`)
        .set({'Authorization': `Bearer ${token}`})
        .then((res) => {
          expect(res.body.username).to.equal(username);
          expect(res.body.password).to.exist;
          expect(res.body.email).to.equal(email);
          expect(res.body.portfolios).to.be.an('array');
          expect(res.body._id).to.exist;
          done();
        })
        .catch(done);
    });
    it('should return {} if user does not exist', (done) => {
      sinon.stub(User, 'findOne').rejects({});
      request(app)
        .get(`/api/users/${username}`)
        .set({'Authorization': `Bearer ${token}`})
        .then((res) => {
          expect(res.body).to.be.empty;
          done();
        })
        .catch(done);
    });
  });

  describe('### PUT api/users/:username', () => {
    it('should ')
  });

  describe('### DELETE api/users/:username', () => {

  });

  
});
