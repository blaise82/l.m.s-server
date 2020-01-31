import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';
import generateAuthToken from '../helpers/jwtHandler';

chai.use(chaiHttp);


const adminAccessToken = generateAuthToken({ email: 'abdoul@gmail.com', isAdmin: true });
const adminWrongAccessToken = generateAuthToken({ email: 'abdoul2@gmail.com', isAdmin: false });


const searchkey = {
  searchKey: 'love',
};
const empSearchkey = {
  searchKey: '',
};

describe('Search', () => {
  it('it should not return data', (done) => {
    chai
      .request(app)
      .post('/api/v1/search')
      .send(empSearchkey)
      .set('x-auth-token', adminWrongAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body).to.have.property('error');
        done();
      });
  });
  it('it should return data', (done) => {
    chai
      .request(app)
      .post('/api/v1/search')
      .send(searchkey)
      .set('x-auth-token', adminAccessToken)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('message');
        done();
      });
  });
});
