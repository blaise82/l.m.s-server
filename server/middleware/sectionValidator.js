import Joi from 'joi';

const sectionValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    sectionName: Joi.string().required().min(3).max(25)
      .trim()
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
export default sectionValidator;
