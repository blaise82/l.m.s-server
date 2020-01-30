/* eslint-disable import/no-extraneous-dependencies */
import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';

chai.use(chaiHttp);
let token;
describe('delete a section', () => {
  before((done) => {
    chai
      .request(app)
      .post('/api/v1/auth/signin')
      .send({
        email: 'abdoul@gmail.com',
        password: 'password',
      })
      .end((err, res) => {
        token = res.body.data.token;
        expect(res.status).to.equal(200);
        done();
      });
  });
  it('adding a section', (done) => {
    chai
      .request(app)
      .post('/api/v1/sections')
      .set('x-auth-token', token)
      .send({
        sectionName: 'physics',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        done();
      });
  });
  it('it should not delete a section which doesn\'t exist', (done) => {
    chai
      .request(app)
      .delete('/api/v1/sections/fantasy')
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(404);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.deep.equal('section not found');
        done();
      });
  });
  it('it should delete a section which does exist', (done) => {
    chai
      .request(app)
      .delete('/api/v1/sections/physics')
      .set('x-auth-token', token)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.deep.equal('section deleted successfully');
        done();
      });
  });
});
