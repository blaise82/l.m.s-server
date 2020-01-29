import Joi from 'joi';

const issueValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    memberID: Joi.string().guid(),
    isbnNumber: Joi.string().guid(),
  });
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(400).json({
      status: 400,
      error: error.details[0].message,
    });
  }
  return next();
};
export default issueValidator;
