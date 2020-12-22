const request = require('supertest-as-promised');
const chai = require('chai');
const sinon = require('sinon');
const config = require('../../config/environment');
const app = require('../../../app');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Portfolio = mongoose.model('Portfolio');

const expect = chai.expect;

describe('## Portfolio API Tests', () => {
  let sandbox, user, token;
  const username = 'testuser1';
  const password = 'password1';
  const email = 'test1@email.com';

  before((done) => {
    sinon.stub(console, 'log');
    User.create({
      username: username,
      password: password,
      email: email,
    }).then((u) => {
      user = u;
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
  });

  after(async() => {
    const collections = await mongoose.connection.db.collections();
    for (let collection of collections) {
      await collection.deleteMany();
    }
    sinon.restore();
  });

  describe('### POST /api/users/:username/portfolios', () => {
    it('should return a portfolioId and user should have the id in portfolios property', (done) => {
      request(app)
        .post(`/api/users/${username}/portfolios`)
        .set({'Authorization': `Bearer ${token}`})
        .then((res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body._id).to.exist;
          expect(res.body.user_id).to.equal(user._id.toString());
          done();
        })
        .catch(done);
    });
  });
});