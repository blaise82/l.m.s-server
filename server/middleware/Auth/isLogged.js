import jwt from 'jsonwebtoken';
import { User } from '../../db/models';

const isLoggedIn = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const verify = jwt.verify(token, process.env.JWT_KEY);
    const validUser = await User.findOne({
      where: {
        email: verify.email,
      },
    });
    if (validUser) {
      req.user = verify;
      next();
    } else {
      res.status(401).json({
        status: 401,
        message: 'You have to login first',
      });
    }
  } catch (error) {
    res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};
export default isLoggedIn;
