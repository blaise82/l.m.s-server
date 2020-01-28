import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import generateAuthToken from '../helpers/jwtHandler';

const invalidUserToken = generateAuthToken({email: 'yewe@yewe.com', isAdmin: false});
const nonAdminAccessToken = generateAuthToken({email: 'ad@yahoo.com', isAdmin: false});
const withAdminAccessToken = generateAuthToken({email: 'ad@yahoo.com', isAdmin: true});
chai.use(chaiHttp);
describe('Section', () => {
  it('it should not add section when no token provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/sections')
      .send({
        sectionName: 'Novel',
      })
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.deep.equal('System rejected. No access token found!');
        done();
      });
  });

  it('it should reject request when token does not belong to any user', (done) => {
    chai
      .request(app)
      .post('/api/v1/sections')
      .send({
        sectionName: 'Programming',
      })
      .set('x-auth-token', invalidUserToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.deep.equal('Access denied!');
        done();
      });
  });

  it('it should not allow non-admin members to  add a section', (done) => {
    chai
      .request(app)
      .post('/api/v1/sections')
      .send({
        sectionName: 'Programming',
      })
      .set('x-auth-token', nonAdminAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(403);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.deep.equal('You are not able to add section!');
        done();
      });
  });

  it('it should add section', (done) => {
    chai
      .request(app)
      .post('/api/v1/sections')
      .send({
        sectionName: 'Programming',
      })
      .set('x-auth-token', withAdminAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.deep.equal('Section added successfully');
        done();
      });
  });

  it('it should not allow adding duplicate sections', (done) => {
    chai
      .request(app)
      .post('/api/v1/sections')
      .send({
        sectionName: 'Programming',
      })
      .set('x-auth-token', withAdminAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.deep.equal('Section already exists');
        done();
      });
  });
   
});
