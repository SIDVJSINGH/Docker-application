const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    // phone: Joi.string().required(),
    phone: Joi.string().allow('').optional(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    password: Joi.string().required().custom(password),
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    dob: Joi.string().required(),
    role: Joi.string().required().valid('user', 'admin'),
    isEmailVerified: Joi.boolean().required(),
    // isPhoneVerified: Joi.boolean().required(),
    is_accept_terms_and_conditions: Joi.boolean().required()
  }),
};

const getUsers = {
  query: Joi.object().keys({
    first_name: Joi.string(),
    last_name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  // body: Joi.object()
  //   .keys({
  //     isActive: Joi.boolean(),
  //     isDelete: Joi.boolean(),
  //     email: Joi.string().email(),
  //     password: Joi.string().custom(password),
  //     first_name: Joi.string(),
  //     last_name: Joi.string(),
  //   })
  //   .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
