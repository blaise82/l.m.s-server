import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';

chai.use(chaiHttp);
describe('Member signup', () => {
  it('it should signup user if all data are given', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
      .send({
        fullName: 'ishimwe remo',
        email: 'ad@yahoo.com',
        password: 'test1345',
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
  it('it shouldn\'t signup user if all data aren\'t given', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
      .send({
        fullName: 'ishimwe remo',
        email: 'add@yahoo.com',
      })
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  it('it shouldn\'t signup user if all data aren\'t given', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/signup')
      .send({
        fullName: 'ishimwe remo',
        email: 'ad@yahoo.com',
        password: 'test1234',
      })
      .end((err, res) => {
        expect(res.status).to.equal(409);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });
});
