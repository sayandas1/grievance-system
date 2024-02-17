const Joi = require('joi');

const validateRegister = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid('employee', 'hr').required(),
  });
  return schema.validate(data);
};

const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(data);
};

const validateGrievance = (data) => {
  const schema = Joi.object({
    issue: Joi.string().required(),
  });
  return schema.validate(data);
};

const validateMessage = (data) => {
  const schema = Joi.object({
    message: Joi.string().required(),
  });
  return schema.validate(data);
};

module.exports = { validateRegister, validateLogin, validateGrievance, validateMessage };
