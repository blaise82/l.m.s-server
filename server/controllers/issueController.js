import moment from 'moment';
import uuid from 'uuid';

import { Books, Issues, User } from '../db/models';

class issueBook {
  static async add(req, res) {
    if (req.user.isAdmin !== true) {
      return res.status(401).json({
        status: 401,
        error: 'You are not allowed to perform this action',
      });
    }
    const fine = 0;
    const issuedDate = moment().format('LLLL');
    const returnDate = 0;
    const { memberID, isbnNumber } = req.body;

    const findMember = await User.findOne({
      where: {
        memberID,
      },
    });
    if (!findMember) {
      return res.status(404).json({
        status: 404,
        error: 'Member with this ID is not found',
      });
    }
    const freeBooks = await Books.findOne({
      where: {
        isbnNumber,
        status: 'available',
      },
    });
    if (!freeBooks) {
      return res.status(404).json({
        status: 404,
        error: 'Book Not Found',
      });
    }
    const updateBookStatus = await Books.update(
      { status: 'issued' },
      { where: { isbnNumber } },
    );
    if (!updateBookStatus) {
      return res.status(500).json({
        status: 500,
        error: 'something is wrong!',
      });
    }
    try {
      await Issues.create({
        memberID,
        isbnNumber,
        issuedDate,
        returnDate,
        fine,
      });
      return res.status(201).json({
        status: 200,
        message: 'book issued',
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error,
      });
    }
  }
}

export default issueBook;
