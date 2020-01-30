/* eslint-disable max-len */
import uuid from 'uuid/v4';
import { validationResult } from 'express-validator';
import { Books, Section } from '../db/models';

class bookController {
  static async createBook(req, res) {
    /**
     * @description Books registration
     * @static
     * @param {object} req
     * @param {object} res
     * @returns {object} newBook
     * @memberof bookController
     */

    try {
      if (req.user.isAdmin !== true) {
        return res.status(401).json({
          status: 401,
          error: 'You are not allowed to perform this action',
        });
      }

      const {
        bookName, author, description,
        bookPrice, status, section,
      } = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty(422)) {
        return res.status(422).json({
          status: 422,
          errors: errors.array(),
        });
      }
      const sectionExist = await Section.findOne({
        where: {
          sectionName: section.toUpperCase().trim(),
        },
      });
      const bookExist = await Books.findOne({
        where: {
          bookName: bookName.trim(),
        },
      });

      if (bookExist) {
        return res.status(409).json({
          status: 409,
          error: 'The book you are trying to register is already registered',
        });
      }

      if (!sectionExist) {
        return res.status(404).json({
          status: 404,
          error: 'The section you entered is not available',
        });
      }

      const newBook = await Books.create({
        isbnNumber: uuid(), sectionId: sectionExist.sectionId, bookName, author, description, bookPrice, status,
      });

      return res.status(201).json({
        status: 201,
        message: 'Book registered successfully',
        data: newBook,
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }
  };
  static async deleteBook(req, res){

    try{
       const bookId = req.params.bookId;
       if(isNaN(bookId)){
        return res.status(400).json({
          status: 400,
          error: 'Book id must be integer',
        });
       }
       const bookExist = await Books.findOne({
        where: {
          id: bookId.trim(),
        },
      });

      if (!bookExist) {
        return res.status(404).json({
          status: 404,
          error: 'Book is not found',
        });
      }
     const deletedBook = await Books.destroy({
          where:{
            id: bookId
          }
     })
     if(deletedBook){
       return res.status(200).json({
        status: 200,
        message: 'Book deleted successfully',
        data: []
      })
     }

    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: error.message,
      });
    }

  }
}

export default bookController;
