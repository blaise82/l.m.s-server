import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import generateAuthToken from '../helpers/jwtHandler';

const nonAdminAccessToken = generateAuthToken({ email: 'ad@yahoo.com', isAdmin: false });
const withAdminAccessToken = generateAuthToken({ email: 'abdoul@gmail.com', isAdmin: true });
chai.use(chaiHttp);
describe('Section', () => {
  it('it should not allow bad request', (done) => {
    chai
      .request(app)
      .post('/api/v1/sections')
      .send({
        something: 'Novel',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('it should not add section when no token provided', (done) => {
    chai
      .request(app)
      .post('/api/v1/sections')
      .send({
        sectionName: 'Novel',
      })
      .end((err, res) => {
        expect(res.status).to.equal(500);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
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
        expect(res.status).to.equal(401);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        done();
      });
  });

  it('it should add section', (done) => {
    chai
      .request(app)
      .post('/api/v1/sections')
      .send({
        sectionName: 'Programming'.toUpperCase().trim(),
      })
      .set('x-auth-token', withAdminAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('it should not allow adding duplicate sections', (done) => {
    chai
      .request(app)
      .post('/api/v1/sections')
      .send({
        sectionName: 'Programming'.toUpperCase().trim(),
      })
      .set('x-auth-token', withAdminAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('it should return 404 if section is not found', (done) => {
    chai
      .request(app)
      .patch('/api/v1/sections/787853786')
      .send({
        sectionName: 'Updated section',
      })
      .set('x-auth-token', withAdminAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.deep.equal('Section not found');
        done();
      });
  });

  it('it should update section', (done) => {
    chai
      .request(app)
      .patch('/api/v1/sections/e80a1be0-428d-11ea-9434-ab08a1e03ed1')
      .send({
        sectionName: 'Updated section',
      })
      .set('x-auth-token', withAdminAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.deep.equal('Section edited successfully');
        done();
      });
  });
});
