import { Books } from '../db/models';

const Sequelize = require('sequelize');

const { Op } = Sequelize;

class search {
  static async adminSearch(req, res) {
    if (req.user.isAdmin !== true) {
      return res.status(401).json({
        status: 401,
        error: 'You are not allowed to perform this action',
      });
    }
    const { searchKey } = req.body;

    const found = await Books.findAll({
      where: {
        [Op.or]: [
          {
            bookName: {
              [Op.like]: `%${searchKey}%`,
            },
          },
          {
            description: {
              [Op.like]: `%${searchKey}%`,
            },
          },
          {
            isbnNumber: {
              [Op.like]: `%${searchKey}%`,
            },
          },
          {
            author: {
              [Op.like]: `%${searchKey}%`,
            },
          },
        ],
      },
    });
    if (found.length === 0) {
      return res.status(404).json({
        status: 404,
        error: 'Book Not Found',
      });
    }
    return res.status(200).json({
      status: 200,
      message: 'books found',
      data: { found },
    });
  }
}

export default search;
