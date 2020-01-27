import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import uuid from 'uuid/v1';
import { User } from '../db/models';
import jwtHandler from '../helpers/jwtHandler';

dotenv.config();
class UserController {
  static async signup(req, res) {
    const { fullName, email, password } = req.body;
    try {
      const dbEmail = await User.findOne({
        where: {
          email: email.trim(),
        },
      });
      if (dbEmail) {
        return res.status(409).json({
          status: 409,
          message: 'email already exit',
        });
      }
      const newUser = await User.create({
        memberID: uuid(),
        fullName: fullName.trim(),
        email: email.trim(),
        password: await bcrypt.hash(password, 10),
        isAdmin: false,
      });
      const token = jwtHandler({ email: newUser.email, isAdmin: newUser.isAdmin });
      return res.status(201).json({
        status: 201,
        message: 'you have signup successfully',
        data: {
          memberID: newUser.memberID,
          email: newUser.email,
          isAdmin: newUser.isAdmin,
          token,
        },
      });
    } catch (err) {
      return res.status(500).json({
        status: 500,
        message: 'server error',
        data: err,
      });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const isMember = await User.findOne({
        where: {
          email,
        },
      });

      if (!isMember) {
        return res.status(401).json({
          status: 401,
          error: 'Incorrect username or password combination',
        });
      }

      const truePassword = await bcrypt.compareSync(password, isMember.password);

      if (!truePassword) {
        return res.status(401).json({
          status: 401,
          error: 'Incorrect username or password combination',
        });
      }
      const token = jwtHandler({ email, isAdmin: isMember.isAdmin });

      return res.status(200).json({
        status: 200,
        message: 'Successfully logged in',
        token,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  }
}
export default UserController;
