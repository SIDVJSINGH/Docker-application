const httpStatus = require("http-status");
const catchAsync = require("../utils/catchAsync");
const {
  authService,
  userService,
  tokenService,
  emailService,
} = require("../services");
const User = require("../models/user.model");
const config = require("../config/config");
const customMessage = require("../utils/customMessage");

const register = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const user = await userService.createUser(req.body, req.files);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({
    status: true,
    message: customMessage.getTranslatedPhrase("SIGNUP_SUCCESS", res_language),
    user,
    tokens,
  });
});

const login = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const { email, password, role } = req.body;
  if (role == "admin") {
    const user = await authService.loginAdminWithEmailAndPassword(
      email,
      password,
      role
    );
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.OK).send({
      status: true,
      message: customMessage.getTranslatedPhrase("LOGIN_SUCCESS", res_language),
      user,
      tokens,
    });
  } else {
    const user = await authService.loginUserWithEmailAndPassword(
      email,
      password
    );
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.OK).send({
      status: true,
      message: customMessage.getTranslatedPhrase("LOGIN_SUCCESS", res_language),
      user,
      tokens,
    });
  }
});

const logout = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("LOGOUT_SUCCESS", res_language),
  });
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  if (req.body.role == "admin") {
    const adminExist = await User.findOne({ email: req.body.email, role: "admin", isDelete: false, });
    if (!adminExist) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: false,
        message: customMessage.getTranslatedPhrase("NOT_A_ADMIN", res_language),
      });
    }
    // console.log("adminExist", adminExist);
    const sentEmail = await emailService.sendForgotOtpEmail(
      adminExist.email,
      adminExist.first_name + " " + adminExist.last_name,
      adminExist._id
    );
    if (sentEmail) {
      res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("FORGOT_EMAIL_SENT", res_language),
      });
    } else {
      res.status(httpStatus.UNAUTHORIZED).send({
        status: false,
        message: customMessage.getTranslatedPhrase("DEFAULT_ERROR", res_language),
      });
    }
  } else {
    const userExist = await User.findOne({
      email: req.body.email,
      isDelete: false,
    });
    if (!userExist) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: false,
        message: customMessage.getTranslatedPhrase("NOT_A_USER", res_language),
      });
    }
    // console.log("userExist:-->  ", userExist);
    const sentPEmail = await emailService.sendForgotOtpEmail(
      userExist.email,
      userExist.first_name + " " + userExist.last_name,
      userExist._id
    );
    if (sentPEmail) {
      res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("FORGOT_EMAIL_SENT", res_language),
      });
    } else {
      res.status(httpStatus.CONFLICT).send({
        status: false,
        message: customMessage.getTranslatedPhrase("DEFAULT_ERROR", res_language),
      });
    }
  }
});

const verifyOtp = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  if (req.body.role == "admin") {
    const adminExist = await User.findOne({
      email: req.body.email,
      role: "admin",
      isDelete: false,
    });
    if (!adminExist) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: false,
        message: customMessage.getTranslatedPhrase("NOT_A_ADMIN", res_language),
      });
    }
    const verify = await authService.verifyForgotPassword(
      adminExist,
      req.body.otp
    );
    if (verify) {
      res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("SUCCESS_OTP", res_language),
      });
    } else {
      res.status(httpStatus.CONFLICT).send({
        status: false,
        message: customMessage.getTranslatedPhrase("INVALID_OTP", res_language),
      });
    }
  } else {
    const userExist = await User.findOne({ email: req.body.email, isDelete: false, });
    if (!userExist) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: false,
        message: customMessage.getTranslatedPhrase("NOT_A_USER", res_language),
      });
    }
    const verify = await authService.verifyForgotPassword(
      userExist,
      req.body.otp
    );
    if (verify) {
      res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("SUCCESS_OTP", res_language),
      });
    } else {
      res.status(httpStatus.CONFLICT).send({
        status: false,
        message: customMessage.getTranslatedPhrase("INVALID_OTP", res_language),
      });
    }
  }


});

const resetPassword = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const resetPass = await authService.resetPassword(
    req.body.email,
    req.body.password,
    req.body.confirmPassword,
  );
  if (resetPass) {
    res.status(httpStatus.OK).send({
      status: true,
      message: customMessage.getTranslatedPhrase("RESET_PASSWORD", res_language),
    });
  } else {
    res.status(httpStatus.CONFLICT).send({
      status: false,
      message: customMessage.getTranslatedPhrase("RESET_PASSWORD_FAILED", res_language),
    });
  }
});

const getUser = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const user = await userService.getUserById(req.user._id);
  if (!user) {
    // throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
    return res.status(httpStatus.UNAUTHORIZED).send({
      status: false,
      message: customMessage.getTranslatedPhrase("ERROR_GET_PROFILE", res_language),
      user
    });
  }
  return res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("SUCCESS", res_language),
    user
  });
});

const updateProfile = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const user = await userService.updateUser(req.user._id, req.body, req.files);
  // res.send(user);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("UPDATED_SUCCESSFULLY", res_language),
    user
  });
});

const updateProfileOnUserId = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const user = await userService.updateDataByUserId(req.params.id, req.body, req.files);
  // res.send(user);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("UPDATED_SUCCESSFULLY", res_language),
    user
  });
});

const changePassword = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const { password, newPassword, confirmPassword } = req.body;
  const changePass = await userService.changePassword(
    req.user._id,
    password,
    newPassword,
    confirmPassword,
  );
  if (changePass) {
    res.status(httpStatus.OK).send({
      status: true,
      message: customMessage.getTranslatedPhrase("CHANGE_PASSWORD", res_language),
    });
  } else {
    res.status(httpStatus.CONFLICT).send({
      status: false,
      message: customMessage.getTranslatedPhrase("CHANGE_PASSWORD_FAILED", res_language),
    });
  }
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const checkEmailExists = await userService.userEmailExists(req.body.email);
  if (checkEmailExists) {
    const sentEmail = await emailService.sendVerificationEmail(
      req.body.email
    );
    if (sentEmail) {
      res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("VERIFY_EMAIL_SEND_OTP", res_language),
      });
    } else {
      res.status(httpStatus.CONFLICT).send({
        status: false,
        message: customMessage.getTranslatedPhrase("DEFAULT_ERROR", res_language),
      });
    }
  }
});

const verifyEmail = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const verify = await authService.verifyEmailByOtp(req.body.email, req.body.otp);
  if (verify) {
    res.status(httpStatus.OK).send({
      status: true,
      message: customMessage.getTranslatedPhrase("SUCCESS_OTP", res_language),
    });
  } else {
    res.status(httpStatus.CONFLICT).send({
      status: false,
      message: customMessage.getTranslatedPhrase("INVALID_OTP", res_language),
    });
  }
});

const sendVerificationPhone = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const checkPhoneExists = await userService.userPhoneExists(req.body.phone);
  if (checkPhoneExists) {
    const sentPhone = await authService.sendVerificationPhone(
      req.body.phone
    );
    if (sentPhone) {
      res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("VERIFY_PHONE_SEND_OTP", res_language),
      });
    } else {
      res.status(httpStatus.CONFLICT).send({
        status: false,
        message: customMessage.getTranslatedPhrase("DEFAULT_ERROR", res_language),
      });
    }
  }
});

const verifyPhone = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const verify = await authService.verifyPhoneByOtp(req.body.phone, req.body.otp);
  if (verify) {
    res.status(httpStatus.OK).send({
      status: true,
      message: customMessage.getTranslatedPhrase("SUCCESS_OTP", res_language),
    });
  } else {
    res.status(httpStatus.CONFLICT).send({
      status: false,
      message: customMessage.getTranslatedPhrase("INVALID_OTP", res_language),
    });
  }
});

const getTotalRegisteredUsers = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const totalNoRegUsers = await authService.getTotalRegisteredUsers();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
    totalNoRegUsers
  });
});

const getTotalSurveyCreated = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const totalNoSurveyCreated = await authService.getTotalSurveyCreated();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
    totalNoSurveyCreated
  });
});

const getTotalSurveyCompleted = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const totalNoSurveyCompleted = await authService.getTotalSurveyCompleted();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
    totalNoSurveyCompleted
  });
});

const removeAccount = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  await userService.removeAccount(req.user._id);
  return res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DELETED_SUCCESSFULLY", res_language),
  });
});

const addAdmin = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  req.body.id = req.user._id;
  const user = await userService.addAdminUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({
    status: true,
    message: customMessage.getTranslatedPhrase("ADD_SUCCESS", res_language),
    user,
    tokens,
  });
});

const getAllAdminLists = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const allAdminLists = await authService.getAllAdminLists();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
    allAdminLists
  });
});

const allUserData = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const userList = await userService.getAllUserLists();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
    userList
  });
});

const deleteAdmin = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  req.body.id = req.user._id;
  const user = await userService.deleteAdminById(req.params.id);
  res.status(httpStatus.CREATED).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DELETED_SUCCESSFULLY", res_language),
    user,
  });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  verifyOtp,
  resetPassword,
  getUser,
  updateProfile,
  updateProfileOnUserId,
  changePassword,
  sendVerificationEmail,
  verifyEmail,
  sendVerificationPhone,
  verifyPhone,
  getTotalRegisteredUsers,
  getTotalSurveyCreated,
  getTotalSurveyCompleted,
  removeAccount,
  addAdmin,
  getAllAdminLists,
  allUserData,
  deleteAdmin,
};
