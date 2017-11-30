import supertest from 'supertest';
import chai from 'chai';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import server from '../../server';
import { valid, yetAnotherValid, anotherValid, invalidUsername, invalidEmail, invalidNumber, wrongUser, noEmail, noPassword, noFullName } from '../../__mocks__/user';

chai.use(chaiHttp);
const api = supertest.agent(server);
const { expect } = chai;

let token;

before((done) => {
  mongoose.createConnection('mongodb://127.0.0.1:27017/ideabox', () => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });
});

describe('Signup route', () => {
  it('should not allow a new user to register with an empty username field', (done) => {
    api
      .post('/api/v1/user/signup')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Username field must not be empty');
        done();
      });
  });

  it('should not allow a new user to register with an empty password field', (done) => {
    api
      .post('/api/v1/user/signup')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(noPassword)
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Password field must not be empty');
        done();
      });
  });

  it('should not allow user with empty full name field to register', (done) => {
    api
      .post('/api/v1/user/signup')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(noFullName)
      .expect(401)
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Full name field must not be empty');
        done();
      });
  });

  it('should not create user with empty email field', (done) => {
    api
      .post('/api/v1/user/signup')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(noEmail)
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Email field must not be empty');
        done();
      });
  });

  it('should allow new user to create an account', (done) => {
    api
      .post('/api/v1/user/signup')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(valid)
      .end((err, res) => {
        token = res.body.token;
        expect(res.status).to.deep.equal(201);
        expect(res.body.message).to.deep.equal(`Welcome to Idea-Box!! ${valid.username}`);
        done();
      });
  });
});
