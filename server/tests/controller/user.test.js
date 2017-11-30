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

  it('should generate token when user creates an account', (done) => {
    api
      .post('/api/v1/user/signup')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(yetAnotherValid)
      .end((err, res) => {
        expect(res.status).to.deep.equal(201);
        expect(res.body.token).to.be.a('string');
        done();
      });
  });

  it('should not create user with an already used email ', (done) => {
    api
      .post('/api/v1/user/signup')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(valid)
      .end((err, res) => {
        expect(res.status).to.deep.equal(409);
        expect(res.body.error).to.deep.equal('user with that email already exist');
        done();
      });
  });

  it('should not create user with an already used username ', (done) => {
    api
      .post('/api/v1/user/signup')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(anotherValid)
      .end((err, res) => {
        expect(res.status).to.deep.equal(409);
        expect(res.body.error).to.deep.equal('user with that username already exist');
        done();
      });
  });
});

describe('Sign in route', () => {
  it('should allow registered user to log in ', (done) => {
    api
      .post('/api/v1/user/signin')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: valid.username,
        password: valid.password
      })
      .end((err, res) => {
        token = res.body.token;
        expect(res.status).to.deep.equal(201);
        expect(res.body.message).to.deep.equal('Welcome back Mcdavid');
        done();
      });
  });

  it('should not allow user with wrong username to log in ', (done) => {
    api
      .post('/api/v1/user/signin')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(wrongUser)
      .end((err, res) => {
        expect(res.status).to.deep.equal(404);
        expect(res.body.error).to.deep.equal('Username is incorrect');
        done();
      });
  });

  it('should not allow user with wrong password to log in ', (done) => {
    api
      .post('/api/v1/user/signin')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'mcdavid',
        password: 'janike_13a'
      })
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.error).to.deep.equal('Incorrect password');
        done();
      });
  });

  it('should not allow user with wrong username to log in with empty username field', (done) => {
    api
      .post('/api/v1/user/signin')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send()
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Username field must not be empty');
        done();
      });
  });

  it('should not allow user with wrong username to log in with empty username field', (done) => {
    api
      .post('/api/v1/user/signin')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send()
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Username field must not be empty');
        done();
      });
  });
});
