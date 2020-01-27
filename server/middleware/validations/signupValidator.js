import Joi from 'joi';

const signupValidator = (req, res, next) => {
  const schema = Joi.object().keys({
    fullName: Joi.string().required().min(3).max(25)
      .trim(),
    email: Joi.string().email().required().trim(),
    password: Joi.string().required().min(6).max(40)
      .trim(),
  });
  const { error } = Joi.validate(req.body, schema);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message,
    });
  }
  return next();
};
export default signupValidator;
