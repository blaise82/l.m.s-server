import express from 'express';
import sectionController from '../controllers/sectionController';
import sectionValidator from '../middleware/validations/sectionValidator';
import isLoggedIn from '../middleware/Auth/isLogged';

const router = express.Router();
router.post('/', [sectionValidator, isLoggedIn], sectionController.addSection);
export default router;
