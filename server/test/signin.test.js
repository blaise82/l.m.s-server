import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';

chai.use(chaiHttp);
describe('signin in tests', () => {
  it('it should signup user if all data are given', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
      .send({
        fullName: 'Rusimbi Patrick',
        email: 'pat@email.com.com',
        password: 'password',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.deep.equal('you have signup successfully');
        done();
      });
  });

  it('It should login user successfuly', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signin')
      .send({
        email: 'pat@email.com.com',
        password: 'password',
      })
      .end((err, res) => {
        expect(res.body).to.have.keys('status', 'message', 'token');
        expect(res.body.status).to.be.equal(200);
        expect(res.body.message).to.be.equal('Successfully logged in');
        expect(res.body.token).to.be.a('string');
        expect(res);
        done();
      });
  });

  it('It should show an error if the email is missing', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signin')
      .send({ })
      .end((err, res) => {
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal(' email  is required');
        expect(res.body.error).to.be.a('string');
        expect(res);
        done();
      });
  });

  it('It should show an error if the password is missing', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signin')
      .send({
        email: 'someemail@email.com',
      })
      .end((err, res) => {
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.status).to.be.equal(400);
        expect(res.body.error).to.be.equal(' password  is required');
        expect(res.body.error).to.be.a('string');
        expect(res);
        done();
      });
  });

  it('It should show an error if the user tries to sign in with invalid credentials', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signin')
      .send({
        email: 'someemail@email.com',
        password: 'wrong',
      })
      .end((err, res) => {
        expect(res.body).to.have.keys('status', 'error');
        expect(res.body.status).to.be.equal(404);
        expect(res.body.error).to.be.equal('Incorrect username or password combination');
        expect(res.body.error).to.be.a('string');
        expect(res);
        done();
      });
  });
});
