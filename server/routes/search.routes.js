import express from 'express';
import Search from '../controllers/searchController';
import isLoggedIn from '../middleware/Auth/isLogged';

const router = express.Router();
router.post('/', isLoggedIn, Search.adminSearch);

export default router;
