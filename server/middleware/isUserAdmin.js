import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { User } from '../db/models';

dotenv.config();

const isUserAdmin = async (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({
      status: 401,
      message: 'System rejected. No access token found!',
    });
  }

  try {
    const { email, isAdmin } = jwt.verify(token, process.env.JWT_KEY);
    const  user = await User.findAll({
      where: {
        email: email.trim(),
      },
    });
    if (user.length === 0) {
      return res.status(401).json({
        status: 401,
        error: 'Access denied!'
      });
    }
    if(!isAdmin){
      return res.status(403).json({
        status: 403,
        message: 'You are not able to add section!'
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      status: 400,
      message: error.message
    });
  }
};

export default isUserAdmin;