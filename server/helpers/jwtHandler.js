import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const jwtHandler = (obj) => jwt.sign(obj, process.env.JWT_KEY);
export default jwtHandler;
