import supertest from 'supertest';
import chai from 'chai';
import mongoose from 'mongoose';
import chaiHttp from 'chai-http';
import server from '../../server';
import { valid, yetAnotherValid, anotherValid, invalidEmail, wrongUser, noEmail, updateUser, noPassword, noFullName, user, newUser1 } from '../../__mocks__/user';

chai.use(chaiHttp);
const api = supertest.agent(server);
const { expect } = chai;

let token, jwtToken;

before((done) => {
  mongoose.createConnection(process.env.DB_URL, () => {
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
        jwtToken = res.body.token;
        expect(res.status).to.deep.equal(201);
        expect(res.body.message).to.deep.equal(`Welcome to Idea-Box!! ${valid.username}`);
        done();
      });
  });

  it('should allow another new user to create an account', (done) => {
    api
      .post('/api/v1/user/signup')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(newUser1)
      .end((err, res) => {
        expect(res.status).to.deep.equal(201);
        expect(res.body.message).to.deep.equal(`Welcome to Idea-Box!! ${newUser1.username}`);
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

  it('should not allow user to log in with empty password field', (done) => {
    api
      .post('/api/v1/user/signin')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        username: 'mcdavid'
      })
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Password field must not be empty');
        done();
      });
  });
});

describe('Reset Password route', () => {
  it('should not generate a token if user passes in no email address', (done) => {
    api
      .post('/api/v1/user/reset')
      .expect(401)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        name: ' fkmfkmk'
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body.message).to.equal('Please provide your email');
        done();
      });
  });

  it('should not create reset password token if email is incorrect', (done) => {
    api
      .post('/api/v1/user/reset')
      .expect(404)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(invalidEmail)
      .end((err, res) => {
        expect(res.status).to.deep.equal(404);
        expect(res.body.error).to.deep.equal('Account associated with this email not found');
        done();
      });
  });

  it('should generate a token if user passes in a correct email address', (done) => {
    api
      .post('/api/v1/user/reset')
      .expect(202)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        email: 'mcdavidemereuwa95@gmail.com'
      })
      .end((err, res) => {
        token = res.body.passwordToken;
        expect(res.status).to.equal(202);
        expect(res.body.message).to.deep.equal('A link has has been sent to your mail');
        done();
      });
  });

  it('should succesfully reset the password', (done) => {
    api
      .put(`/api/v1/user/reset/${token}`)
      .expect(201)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        newPassword: 'mcdavid356',
        confirmPassword: 'mcdavid356'
      })
      .end((err, res) => {
        expect(res.status).to.deep.equal(201);
        expect(res.body.message).to.deep.equal('Password has been updated');
        done();
      });
  });

  it('should not reset the password if invalid token is provided', (done) => {
    api
      .put('/api/v1/user/reset/98ec81c1a43749baf4b4081233fe78c14fiufub5ea505')
      .expect(404)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        newPassword: 'mcdavid356',
        confirmPassword: 'mcdavid356'
      })
      .end((err, res) => {
        expect(res.status).to.deep.equal(404);
        expect(res.body.error).to.deep.equal('failed token authentication');
        done();
      });
  });

  it('should not reset the password if user details is incomplete', (done) => {
    api
      .put(`/api/v1/user/reset/${token}`)
      .expect(400)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send({
        newPassword: 'mcdavid356'
      })
      .end((err, res) => {
        expect(res.status).to.deep.equal(400);
        expect(res.body.error).to.deep.equal('Please confirm passwords');
        done();
      });
  });
});

describe('Update Route', () => {
  it('should not update user details if email is already in use', (done) => {
    api
      .put('/api/v1/user/update')
      .expect(409)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .type('form')
      .send(newUser1)
      .end((err, res) => {
        expect(res.status).to.deep.equal(409);
        expect(res.body.error).to.deep.equal('user with that email already exist');
        done();
      });
  });

  it('should not update user details if username is already in use', (done) => {
    api
      .put('/api/v1/user/update')
      .expect(409)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .type('form')
      .send(user)
      .end((err, res) => {
        expect(res.status).to.deep.equal(409);
        expect(res.body.error).to.deep.equal('user with that username already exist');
        done();
      });
  });

  it('should update user details if username and email are correct', (done) => {
    api
      .put('/api/v1/user/update')
      .expect(409)
      .set('Connection', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .type('form')
      .send(updateUser)
      .end((err, res) => {
        expect(res.status).to.deep.equal(202);
        expect(res.body.message).to.deep.equal('Details successfully updated');
        done();
      });
  });
});
