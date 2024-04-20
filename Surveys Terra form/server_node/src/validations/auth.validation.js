const Joi = require("joi");
const {
  password,
  first_name,
  last_name,
  confirmPassword,
} = require("./custom.validation");

const register = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    // phone: Joi.string().required(),
    phone: Joi.string().allow("").optional(),
    // address: Joi.string().when('role', {
    //   is: 'admin',
    //   then: Joi.allow('').optional(),
    //   otherwise: Joi.required(),
    // }),
    address: Joi.string().allow("").optional(),
    country: Joi.string().when("role", {
      is: "admin",
      then: Joi.allow("").optional(),
      otherwise: Joi.required(),
    }),
    state: Joi.string().when("role", {
      is: "admin",
      then: Joi.allow("").optional(),
      otherwise: Joi.required(),
    }),
    zip_code: Joi.string().allow("").optional(),
    dob: Joi.string().when("role", {
      is: "admin",
      then: Joi.allow("").optional(),
      otherwise: Joi.required(),
    }),
    gender: Joi.string().when("role", {
      is: "admin",
      then: Joi.allow("").optional(),
      otherwise: Joi.required(),
    }),
    role: Joi.string().allow("").optional(),
    password: Joi.string().required().custom(password),
    confirm_password: Joi.string().when("role", {
      is: "admin",
      then: Joi.allow("").optional(),
      otherwise: Joi.required(),
    }),
    isEmailVerified: Joi.boolean().required(),
    // isPhoneVerified: Joi.boolean().required(),
    is_accept_terms_and_conditions: Joi.boolean().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    role: Joi.string().allow("").optional(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    role: Joi.string(),
  }),
};

const verifyOtp = {
  body: Joi.object().keys({
    role: Joi.string(),
    email: Joi.string().email().required(),
    otp: Joi.string().required(),
  }),
};

const resetPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required().custom(password),
    confirmPassword: Joi.string().required().custom(confirmPassword),
  }),
};

const updateProfile = {
  authorization: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const changePassword = {
  authorization: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required(),
    newPassword: Joi.string().required().custom(password),
    confirmPassword: Joi.string().required().custom(confirmPassword),
  }),
};

const sendVerifyEmail = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
};

const verifyEmail = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    otp: Joi.string().required(),
  }),
};

const sendVerifyPhone = {
  body: Joi.object().keys({
    phone: Joi.string().required(),
  }),
};

const verifyPhone = {
  body: Joi.object().keys({
    phone: Joi.string().required(),
    otp: Joi.string().required(),
  }),
};

const addAdmin = {
  body: Joi.object().keys({
    first_name: Joi.string().required(),
    last_name: Joi.string().required(),
    email: Joi.string().required().email(),
    // phone: Joi.string().required(),
    phone: Joi.string().allow("").optional(),
    role: Joi.string().allow("admin").required(),
    password: Joi.string().required().custom(password),
    // isEmailVerified: Joi.boolean().required(),
    // isPhoneVerified: Joi.boolean().required(),
    // is_accept_terms_and_conditions: Joi.boolean().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  verifyOtp,
  resetPassword,
  updateProfile,
  changePassword,
  sendVerifyEmail,
  verifyEmail,
  sendVerifyPhone,
  verifyPhone,
  addAdmin,
};
