const httpStatus = require("http-status");
const tokenService = require("./token.service");
const userService = require("./user.service");
const Token = require("../models/token.model");
const ApiError = require("../utils/ApiError");
const { tokenTypes } = require("../config/tokens");
const config = require("../config/config");
const customMessage = require("../utils/customMessage");
const bcrypt = require('bcryptjs');
const User = require("../models/user.model");
const EmailOtpVerifySchema = require("../models/email.otp.verify.model");
const Survey = require("../models/survey.management.model");
const loginUserWithEmailAndPassword = async (email, password) => {
  // const user = await userService.getUserByEmail(email);
  const user = await userService.getUserByEmailAndRole(email, "user");
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      customMessage.getTranslatedPhrase(
        "INCORRECT_PASSWORD",
        config.getResponseLanguage()
      )
    );
  }
  if (user.isEmailVerified == false) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      customMessage.getTranslatedPhrase(
        "NOT_A_USER",
        config.getResponseLanguage()
      )
    );
  }
  // if (user.isPhoneVerified == false) {
  //   throw new ApiError(
  //     httpStatus.NOT_FOUND,
  //     customMessage.getTranslatedPhrase(
  //       "NOT_A_USER",
  //       config.getResponseLanguage()
  //     )
  //   );
  // }
  if (user.isActive == false) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      customMessage.getTranslatedPhrase(
        "NOT_A_USER",
        config.getResponseLanguage()
      )
    );
  }
  if (user.isDelete == true) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      customMessage.getTranslatedPhrase(
        "NOT_A_USER",
        config.getResponseLanguage()
      )
    );
  }
    return user;
};
const loginAdminWithEmailAndPassword = async (email, password, role) => {
  const user = await userService.getUserByEmailAndRole(email, role);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      customMessage.getTranslatedPhrase(
        "INCORRECT_PASSWORD",
        config.getResponseLanguage()
      )
    );
  }
  if (user.isActive == false) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      customMessage.getTranslatedPhrase(
        "NOT_A_USER",
        config.getResponseLanguage()
      )
    );
  }
  if (user.isDelete == true) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      customMessage.getTranslatedPhrase(
        "NOT_A_USER",
        config.getResponseLanguage()
      )
    );
  }
  return user;
};

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      customMessage.getTranslatedPhrase(
        "NOT_A_USER",
        config.getResponseLanguage()
      )
    );
  }
  await refreshTokenDoc.remove();
};

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(
      refreshToken,
      tokenTypes.REFRESH
    );
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      customMessage.getTranslatedPhrase(
        "PLEASE_AUTHENTICATE",
        config.getResponseLanguage()
      )
    );
  }
};

const verifyForgotPassword = async (ReqUser, otp) => {
  try {
    const Verify = await userService.userOtpVerify(ReqUser._id, otp);
    if (!Verify) {
      return false;
    }
    // await Token.deleteMany({ user: user.id, type: tokenTypes.VERIFY_EMAIL });
    await userService.updateUserById(ReqUser._id, {
      isEmailVerified: true,
      otp: "",
    });
    return true;
  } catch (error) {
    // console.log("error", error);
    return false;
  }
};

const resetPassword = async (resetPasswordEmail, password, confirmPassword) => {
  try {
    if (password != confirmPassword) {
      throw new ApiError(httpStatus.UNAUTHORIZED, customMessage.getTranslatedPhrase(
        "MATCH_PASSWORD_CONFIRM_PASSWORD_FAILED", config.getResponseLanguage()
      ));
    }
    const userExist = await User.findOne({ email: resetPasswordEmail, isDelete: false });
    if (!userExist) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: false,
        message: customMessage.getTranslatedPhrase("NOT_A_USER", config.getResponseLanguage()),
      });
    }
    if (userExist.isEmailVerified != true) {
      return res.status(httpStatus.UNAUTHORIZED).send({
        status: false,
        message: customMessage.getTranslatedPhrase("NOT_A_USER", config.getResponseLanguage()),
      });
    }
    const bcryptPassword = await bcrypt.hash(password, 10);
    await User.findByIdAndUpdate(userExist._id, { password: bcryptPassword }, { new: true });
    // await Token.deleteMany({ user: userExist.id, type: tokenTypes.RESET_PASSWORD });
    return true;
  } catch (error) {
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      customMessage.getTranslatedPhrase(
        "RESET_PASSWORD_FAILED",
        config.getResponseLanguage()
      )
    );
  }
};

const verifyEmail = async (ReqUser, otp) => {
  try {
    const Verify = await userService.userOtpVerify(ReqUser._id, otp);
    if (!Verify) {
      return false;
    }
    await userService.updateUserById(ReqUser._id, {
      isEmailVerified: true,
      otp: "",
    });
    return true;
  } catch (error) {
    // console.log("error", error);
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      customMessage.getTranslatedPhrase(
        "EMAIL_VERYFI_FAILD",
        config.getResponseLanguage()
      )
    );
  }
};

const verifyEmailByOtp = async (email, otp) => {
  try {
    const VerifyEmail = await userService.userEmailOtpVerify(email, otp)
    if (!VerifyEmail) {
      return false;
    }
    await userService.deleteAfterUserEmailOtpVerify(email, otp);
    return true;
  } catch (error) {
    // console.log("error", error);
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      customMessage.getTranslatedPhrase(
        "EMAIL_VERYFI_FAILD",
        config.getResponseLanguage()
      )
    );
  }
};

const sendVerificationPhone = async (phone) => {
  try {
    const VerifyPhone = await userService.userPhoneVerificationByOtp(phone)
    if (!VerifyPhone) {
      return false;
    }
    return true;
  } catch (error) {
    // console.log("error", error);
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      customMessage.getTranslatedPhrase(
        "PHONE_VERIFY_FAILED",
        config.getResponseLanguage()
      )
    );
  }
};

const verifyPhoneByOtp = async (phone, otp) => {
  try {
    const VerifyPhone = await userService.userPhoneOtpVerify(phone, otp)
    if (!VerifyPhone) {
      return false;
    }
    await userService.deleteAfterUserPhoneOtpVerify(phone, otp);
    return true;
  } catch (error) {
    // console.log("error", error);
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      customMessage.getTranslatedPhrase(
        "PHONE_VERIFY_FAILED",
        config.getResponseLanguage()
      )
    );
  }
};

const getTotalRegisteredUsers = async (_) => {
  try {
    const allRegisteredUsersCount = await User.find({ role: "user", isDelete: false });
    return allRegisteredUsersCount.length;
  } catch (error) {
    // console.log("error", error);
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      customMessage.getTranslatedPhrase(
        "DEFAULT_ERROR",
        config.getResponseLanguage()
      )
    );
  }
}

const getTotalSurveyCreated = async (_) => {
  try {
    const allSurveyCreatedCount = await Survey.model.find({ isDelete: false });
    return allSurveyCreatedCount.length;
  } catch (error) {
    // console.log("error", error);
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      customMessage.getTranslatedPhrase(
        "DEFAULT_ERROR",
        config.getResponseLanguage()
      )
    );
  }
}

const getTotalSurveyCompleted = async (_) => {
  try {
    const allSurveyCreatedCount = await Survey.model.find({ isStatusComplete: true });
    return allSurveyCreatedCount.length;
  } catch (error) {
    // console.log("error", error);
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      customMessage.getTranslatedPhrase(
        "DEFAULT_ERROR",
        config.getResponseLanguage()
      )
    );
  }
}

const getAllAdminLists = async (_) => {
  try {
    return await User.find({ role: "admin", isDelete: false });
  } catch (error) {
    // console.log("error", error);
    throw new ApiError(
      httpStatus.UNAUTHORIZED,
      customMessage.getTranslatedPhrase(
        "DEFAULT_ERROR",
        config.getResponseLanguage()
      )
    );
  }
}

module.exports = {
  loginUserWithEmailAndPassword,
  loginAdminWithEmailAndPassword,
  logout,
  refreshAuth,
  verifyForgotPassword,
  resetPassword,
  verifyEmail,
  verifyEmailByOtp,
  sendVerificationPhone,
  verifyPhoneByOtp,
  getTotalRegisteredUsers,
  getTotalSurveyCreated,
  getTotalSurveyCompleted,
  getAllAdminLists,
};
