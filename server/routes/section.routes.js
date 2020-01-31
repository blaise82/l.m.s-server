import express from 'express';
import sectionController from '../controllers/sectionController';
import sectionValidator from '../middleware/validations/sectionValidator';
import isLoggedIn from '../middleware/Auth/isLogged';

const router = express.Router();
router.post('/', [sectionValidator, isLoggedIn], sectionController.addSection);
router.delete('/:section', isLoggedIn, sectionController.deleteSection);
router.patch('/:sectionId', sectionValidator, isLoggedIn, sectionController.editSection);
router.get('/', isLoggedIn, sectionController.getSections);
export default router;
