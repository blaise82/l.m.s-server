import Router from 'express';
import isLoggedIn from '../middleware/Auth/isLogged';
import bookController from '../controllers/bookController';
import validateBook from '../middleware/validations/bookValidator';
import paramsValidator from '../middleware/validations/paramsValidator';

const routes = Router();

routes.post('/', isLoggedIn, validateBook, bookController.createBook);
routes.get('/', isLoggedIn, bookController.viewAvailableBooks);
routes.delete('/:id', [paramsValidator, isLoggedIn], bookController.deleteBook);
routes.put('/:id', [paramsValidator, isLoggedIn, validateBook], bookController.editBook);

export default routes;
