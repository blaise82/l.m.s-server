import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import { describe, it } from 'mocha';
import app from '../index';

chai.use(chaiHttp);
describe('SERVER CONFIG CHECK', () => {
  it('Should return greeting message', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message');
        expect(res.body.message).to.be.equal('Welcome to L.M.S - Your Library Managment System');
        done();
      });
  });
  it('Should return Bad Request(404 wrong route)', (done) => {
    chai
      .request(app)
      .get('/wrong')
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('error');
        expect(res.body.error).to.be.equal('Oh!, This Page does not exist');
        done();
      });
  });
});
