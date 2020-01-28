import express from 'express';
import sectionController from '../controllers/sectionController';
import sectionValidator from '../middleware/sectionValidator';
import isUserAdmin from '../middleware/isUserAdmin';

const router = express.Router();
router.post('/', sectionValidator, isUserAdmin, sectionController.addSection);
export default router;
