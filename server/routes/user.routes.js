import express from 'express';
import userController from '../controllers/userController';
import signupValidator from '../middleware/validations/signupValidator';
import signinValidator from '../middleware/validations/signinValidator';

const router = express.Router();
router.post('/signup', signupValidator, userController.signup);
router.post('/signin', signinValidator, userController.login);

export default router;
