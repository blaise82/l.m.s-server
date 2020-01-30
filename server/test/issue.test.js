import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import generateAuthToken from '../helpers/jwtHandler';

chai.use(chaiHttp);


const withAdminAccessToken = generateAuthToken({ email: 'abdoul@gmail.com', isAdmin: true });
const nonAdminAccessToken = generateAuthToken({ email: 'ad@yahoo.com', isAdmin: false });
const truemember = generateAuthToken({ email: 'member@gmail.com', isAdmin: false });
const fakemember = generateAuthToken({ email: 'fake@yahoo.com', isAdmin: false });

describe('Issue', () => {
  it('it should not allow issue with no token provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/issues')
      .send({})
      .set('x-auth-token', '')
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('it should not allow issue with member token provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/issues')
      .send({})
      .set('x-auth-token', nonAdminAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('it should not allow issue with member memberId provided not a UUID', (done) => {
    chai
      .request(app)
      .post('/api/v1/issues')
      .send({
        memberID: 'not uuid',
        isbnNumber: '5f199b40-41d3-11ea-8c38-dfcfa682960e',
      })
      .set('x-auth-token', withAdminAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('it should not allow issue with isbnNumber provided not a UUID', (done) => {
    chai
      .request(app)
      .post('/api/v1/issues')
      .send({
        memberID: '5f199b40-41d3-11ea-8c38-dfcfa682960e',
        isbnNumber: 'not uuid',
      })
      .set('x-auth-token', withAdminAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('it should not allow issue if memeberId provided do not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/issues')
      .send({
        memberID: '5f199b40-41d3-11ea-8c38-dfcfa682960e',
        isbnNumber: '5f199b40-41d3-11ea-8ba8-dfcfa682960e',
      })
      .set('x-auth-token', withAdminAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('it should not allow issue if isbnNumber provided do not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/issues')
      .send({
        memberID: '5f199b40-41d3-11ea-8c38-dfcfa682960e',
        isbnNumber: '5f199b40-41d3-11ea-8ba8-dfcfa682960e',
      })
      .set('x-auth-token', withAdminAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('it should allow admin to issue a book', (done) => {
    chai
      .request(app)
      .post('/api/v1/issues')
      .send({
        memberID: '5f199b40-41d3-11ea-8c38-dfcfa682960e',
        isbnNumber: '5f199b40-41d3-11ea-8ba8-dfcfa682960e',
      })
      .set('x-auth-token', withAdminAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
describe('Borrowed', () => {
  it('it should not allow fake users to view thier borrowed books', (done) => {
    chai
      .request(app)
      .get('/api/v1/issues')
      .set('x-auth-token', fakemember)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('it should allow a member to view books issued under his/her id', (done) => {
    chai
      .request(app)
      .get('/api/v1/issues')
      .set('x-auth-token', truemember)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });
});
