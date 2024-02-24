const Joi = require('joi');

const validateUser = (user) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().valid('employee', 'hr').required()
  });
  return schema.validate(user);
};

module.exports = { validateUser };
