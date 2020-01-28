import Router from 'express';
import isLoggedIn from '../middleware/Auth/isLogged';
import bookController from '../controllers/bookController';
import validateBook from '../middleware/validations/bookValidation';


const routes = Router();

routes.post('/', isLoggedIn, validateBook, bookController.createBook);

export default routes;
