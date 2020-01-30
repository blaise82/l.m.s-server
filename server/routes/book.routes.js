import Router from 'express';
import isLoggedIn from '../middleware/Auth/isLogged';
import bookController from '../controllers/bookController';
import validateBook from '../middleware/validations/bookValidator';


const routes = Router();

routes.post('/', isLoggedIn, validateBook, bookController.createBook);
routes.delete('/:bookId',isLoggedIn, bookController.deleteBook);

export default routes;
