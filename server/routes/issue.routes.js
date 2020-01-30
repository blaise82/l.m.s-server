import express from 'express';
import issueBook from '../controllers/issueController';
import issueValidator from '../middleware/validations/issuevalidator';
import isLoggedIn from '../middleware/Auth/isLogged';

const router = express.Router();
router.post('/', [issueValidator, isLoggedIn], issueBook.add);
router.get('/', isLoggedIn, issueBook.byMember);
export default router;
