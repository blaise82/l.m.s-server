import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';

chai.use(chaiHttp);
describe('SERVER CONFIG CHECK', () => {
  it('Should return Server Is On', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res);
        done();
      });
  });
  it('Should return Bad Request(400 wrong route)', (done) => {
    chai
      .request(app)
      .get('/wrong')
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('error');
        done();
      });
  });
});
