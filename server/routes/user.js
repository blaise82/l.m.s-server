import express from 'express';
import userController from '../controllers/user';
import signupValidator from '../middleware/signupValidator';

const router = express.Router();
router.post('/signup', signupValidator, userController.signup);
export default router;
