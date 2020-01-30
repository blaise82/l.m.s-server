import express from 'express';
import issueBook from '../controllers/issueController';
import issueValidator from '../middleware/validations/issuevalidator';
import isLoggedIn from '../middleware/Auth/isLogged';

const router = express.Router();
router.post('/add', [issueValidator, isLoggedIn], issueBook.add);
router.get('/member', isLoggedIn, issueBook.byMember);
export default router;
