import { check } from 'express-validator';

const validateBookInfo = [
  check('bookName').exists().withMessage('The bookName is required').isLength({ min: 3 })
    .withMessage('The bookName must be atleast 3 characters')
    .trim(),
  check('author').exists().withMessage('The author is required').isLength({ min: 3 })
    .withMessage('The author\'s name must be atleast 3 characters')
    .trim(),
  check('description').exists().withMessage('The description is required').trim(),
  check('bookPrice').exists().withMessage('The book price is required').trim(),
  check('status').exists().withMessage('The book status is required').trim(),
  check('section').exists().withMessage('You must provide the section').trim(),
];

export default validateBookInfo;
