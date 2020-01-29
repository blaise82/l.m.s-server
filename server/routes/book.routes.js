import Router from 'express';
import isLoggedIn from '../middleware/Auth/isLogged';
import bookController from '../controllers/bookController';
import validateBook from '../middleware/validations/bookValidator';


const routes = Router();

routes.post('/add', isLoggedIn, validateBook, bookController.createBook);
// routes.delete('/delete', );
// routes.put('/update', );

export default routes;
