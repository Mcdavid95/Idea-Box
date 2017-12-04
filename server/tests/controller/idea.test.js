import supertest from 'supertest';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../server';
import { newUser } from '../../__mocks__/user';
import { noTitle, noDescription, noCategory, createIdea, updateIdea } from '../../__mocks__/idea';

chai.use(chaiHttp);
const api = supertest.agent(server);
const { expect } = chai;
let jwtToken, id;
describe('Idea Route', () => {
  it('should allow new user to create an account', (done) => {
    api
      .post('/api/v1/user/signup')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .type('form')
      .send(newUser)
      .end((err, res) => {
        jwtToken = res.body.token;
        expect(res.status).to.deep.equal(201);
        expect(res.body.message).to.deep.equal(`Welcome to Idea-Box!! ${newUser.username}`);
        done();
      });
  });

  it('should not create idea if title field is empty', (done) => {
    api
      .post('/api/v1/idea')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .type('form')
      .send(noTitle)
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Title field must not be empty');
        done();
      });
  });

  it('should not create idea if description field is empty', (done) => {
    api
      .post('/api/v1/idea')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .type('form')
      .send(noDescription)
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Description field must not be empty');
        done();
      });
  });

  it('should not create idea if categories field is empty', (done) => {
    api
      .post('/api/v1/idea')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .type('form')
      .send(noCategory)
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Category field must not be empty');
        done();
      });
  });

  it('should create a new idea', (done) => {
    api
      .post('/api/v1/idea')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .type('form')
      .send(createIdea)
      .end((err, res) => {
        id = res.body.newIdea._id;
        expect(res.status).to.deep.equal(201);
        expect(res.body.message).to.deep.equal('Idea successfully created');
        done();
      });
  });

  it('should get all public ideas', (done) => {
    api
      .get('/api/v1/ideas')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .type('form')
      .end((err, res) => {
        expect(res.status).to.deep.equal(201);
        expect(res.body.message).to.deep.equal('Ideas successfully fetched');
        done();
      });
  });

  it('should get one idea', (done) => {
    api
      .get(`/api/v1/idea?id=${id}`)
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .type('form')
      .end((err, res) => {
        expect(res.status).to.deep.equal(201);
        expect(res.body.message).to.deep.equal('Idea successfully fetched');
        done();
      });
  });

  it('should not get idea with wrong id', (done) => {
    api
      .get('/api/v1/idea?id=123')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .type('form')
      .end((err, res) => {
        expect(res.status).to.deep.equal(400);
        done();
      });
  });

  it('should permit user to edit his idea', (done) => {
    api
      .get(`/api/v1/idea/${id}`)
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .type('form')
      .end((err, res) => {
        expect(res.status).to.deep.equal(201);
        expect(res.body.canEdit).to.deep.equal(true);
        done();
      });
  });

  it('should permit user to update his idea', (done) => {
    api
      .put(`/api/v1/idea?id=${id}`)
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .type('form')
      .send(updateIdea)
      .end((err, res) => {
        expect(res.status).to.deep.equal(202);
        expect(res.body.updatedIdea.title).to.deep.equal(updateIdea.title);
        done();
      });
  });

  it('should not update idea with wrong id', (done) => {
    api
      .put(`/api/v1/idea?id=${'5a21dce4bd65912924d25d6e'}`)
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .type('form')
      .send(updateIdea)
      .end((err, res) => {
        expect(res.status).to.deep.equal(403);
        expect(res.body.error).to.deep.equal('could not find idea with this id');
        done();
      });
  });

  it('should not update idea when no id is passed as query', (done) => {
    api
      .put('/api/v1/idea')
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .type('form')
      .send(updateIdea)
      .end((err, res) => {
        expect(res.status).to.deep.equal(401);
        expect(res.body.message).to.deep.equal('Please pass idea id to req.query');
        done();
      });
  });

  it('should delete an idea', (done) => {
    api
      .delete(`/api/v1/idea?id=${id}`)
      .set('Connetion', 'keep alive')
      .set('Content-Type', 'application/json')
      .set('x-access-token', jwtToken)
      .type('form')
      .end((err, res) => {
        expect(res.status).to.deep.equal(204);
        expect(res.body.message).to.deep.equal('Idea successfully deleted');
        done();
      });
  });
});
