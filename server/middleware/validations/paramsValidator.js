import Joi from 'joi';

const validateParams = (req, res, next) => {
  const UserSchemas = Joi.object().keys({
    id: Joi.string().guid(),
  });
  const schema = Joi.validate(req.params, UserSchemas);
  if (schema.error) {
    return res.status(400).json({
      status: 400,
      error: 'Please use a valide id',
    });
  }
  next();
};
export default validateParams;
