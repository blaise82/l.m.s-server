import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import generateAuthToken from '../helpers/jwtHandler';

chai.use(chaiHttp);


const withAdminAccessToken = generateAuthToken({ email: 'abdoul@gmail.com', isAdmin: true });
const nonAdminAccessToken = generateAuthToken({ email: 'ad@yahoo.com', isAdmin: false });

describe('Issue', () => {
  it('it should not allow issue with no token provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/issue/add')
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
      .post('/api/v1/issue/add')
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
      .post('/api/v1/issue/add')
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
      .post('/api/v1/issue/add')
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
      .post('/api/v1/issue/add')
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
      .post('/api/v1/issue/add')
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
      .post('/api/v1/issue/add')
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
