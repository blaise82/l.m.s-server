import Chai from 'chai';
import chaiHttp from 'chai-http';
import index from '../index';
import generateAuthToken from '../helpers/jwtHandler';

Chai.use(chaiHttp);
Chai.should();

const adminAccessToken = generateAuthToken({ email: 'abdoul@gmail.com', isAdmin: true });
const adminWrongAccessToken = generateAuthToken({ email: 'abdoul2@gmail.com', isAdmin: false });
const WrongSignedToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFiZG91bEBnbWFpbC5j';
const book = {
  bookName: 'Secrets',
  author: 'Emmanuel',
  description: 'This a love book to teach you all you need to know about love',
  bookPrice: 500,
  status: 'available',
  section: 'Programming',
};
const bookWrong = {
  author: 'E',
  description: 'This a love book to teach you all you need to know about love',
  bookPrice: 500,
  status: 'available',
  section: 'Programming',
};

describe('Library management system', () => {
  it('Should register a new book', (done) => {
    Chai.request(index)
      .post('/api/v1/books')
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send(book)
      .end((err, res) => {
        res.should.have.status(201);
        res.body.should.have.property('message', 'Book registered successfully');
        res.body.data.should.have.property('bookName', book.bookName);
        res.body.data.should.have.property('author', book.author);
        res.body.data.should.have.property('description', book.description);
        res.body.data.should.have.property('bookPrice', book.bookPrice);
        res.body.data.should.have.property('status', book.status);
        done();
      });
  });

  it('Should not register a new book if an admin is not logged in', (done) => {
    Chai.request(index)
      .post('/api/v1/books')
      .set('Authorization', `Bearer ${adminWrongAccessToken}`)
      .send(book)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message', 'You have to login first');
        done();
      });
  });

  it('Should throw a server error if the token was not well signed', (done) => {
    Chai.request(index)
      .post('/api/v1/books')
      .set('Authorization', `Bearer ${WrongSignedToken}`)
      .send(book)
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.have.property('error');
        done();
      });
  });

  it('Should not register a new book if there are validation errors', (done) => {
    Chai.request(index)
      .post('/api/v1/books')
      .set('Authorization', `Bearer ${adminAccessToken}`)
      .send(bookWrong)
      .end((err, res) => {
        res.should.have.status(422);
        res.body.should.have.property('errors');
        done();
      });
  });
});
