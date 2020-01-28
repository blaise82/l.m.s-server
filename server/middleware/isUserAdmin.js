import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../db/models';

dotenv.config();

const isUserAdmin = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      status: 401,
      error: 'System rejected. No access token found!',
    });
  }

  try {
    const { email, isAdmin } = jwt.verify(token, process.env.JWT_KEY);
    if(!isAdmin){
      return res.status(403).json({
        status: 403,
        error: 'You are not able to add section!'
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      error: error.message
    });
  }
};

export default isUserAdmin;