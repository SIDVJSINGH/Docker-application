const httpStatus = require('http-status');
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const customMessage = require('../utils/customMessage');
const config = require('../config/config');
const emailService = require('./email.service')
const EmailOtpVerifySchema = require('../models/email.otp.verify.model')
const PhoneOtpVerifySchema = require('../models/phone.otp.verify.model')
const client = require("twilio")(config.account_sid, config.auth_token);

function generateCustomCode(count) {
  let dateTime = new Date().toISOString().replace(/[^\d]/g, "");
  let str = "0123456789" + dateTime;
  var chars = str.split("");
  var result = "";
  for (var i = 0; i < count; i++) {
    var x = Math.floor(Math.random() * chars.length);
    result += chars[x];
  }
  return result.toUpperCase();
}
// Function to calculate age from date of birth (dob)
function calculateAge(dob) {
  const dobParts = dob.split("-");
  const userYear = parseInt(dobParts[2]);
  const userMonth = parseInt(dobParts[1]) - 1; // Months are 0-indexed (January is 0, February is 1, etc.)
  const userDay = parseInt(dobParts[0]);

  const currentDate = new Date();
  const userDate = new Date(userYear, userMonth, userDay);

  let age = currentDate.getFullYear() - userYear;

  // Check if the birthdate has occurred this year yet
  if (
    currentDate.getMonth() < userMonth ||
    (currentDate.getMonth() === userMonth && currentDate.getDate() < userDay)
  ) {
    age--;
  }

  return age;
}
const userEmailExists = async (email) => {
  try {
    const isUserEmailExists = await User.findOne({ email: email, isDelete: false })
    if (isUserEmailExists) {
      throw new ApiError(httpStatus.BAD_REQUEST, customMessage.getTranslatedPhrase('EMAIL_ALLREADY_EXIST', config.getResponseLanguage()));
    }
    return true;
  } catch (error) {
    // console.log("error---------------    ", error)
    throw error;
    return false;
  }
}
exports.testFunc = async (email, otp) => {
  try {
    const EmailExists = await EmailOtpVerifySchema.findOne({ email: email })
    if (EmailExists) {
      await EmailOtpVerifySchema.findOneAndUpdate(
        { email: email },
        { otp: otp }
      );
      return true;
    } else {
      const emailBody = {
        email: email,
        otp: otp
      }
      await EmailOtpVerifySchema.create(emailBody);
      return true;
    }
  } catch (error) {
    // console.log("error---------------    ", error)
    return false;
  }
}

const userEmailVerificationByOtp = async (email, otp) => {
  // console.log(email, otp, '+++++++++++++++###');
  // console.log(typeof email, typeof otp, '+++++++++++++++###Type');
  try {
    const EmailExists = await EmailOtpVerifySchema.findOne({ email: email })
    if (EmailExists) {
      await EmailOtpVerifySchema.findOneAndUpdate(
        { email: email },
        { otp: otp }
      );
      return true;
    } else {
      const emailBody = {
        email: email,
        otp: otp
      }
      await EmailOtpVerifySchema.create(emailBody);
      return true;
    }
  } catch (error) {
    // console.log("error---------------    ", error)
    return false;
  }
};

const userEmailOtpVerify = async (email, otp) => {
  try {
    const otpExist = await EmailOtpVerifySchema.findOne(
      { email: email, otp: otp }
    );
    if (otpExist) {
      return otpExist;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const deleteAfterUserEmailOtpVerify = async (email, otp) => {
  return EmailOtpVerifySchema.findOneAndDelete({ email: email, otp: otp })
};
const userPhoneExists = async (phone) => {
  try {
    const isUserPhoneExists = await User.findOne({ phone: phone })
    if (isUserPhoneExists) {
      throw new ApiError(httpStatus.BAD_REQUEST, customMessage.getTranslatedPhrase('PHONE_ALLREADY_EXIST', config.getResponseLanguage()));
    }
    return true;
  } catch (error) {
    // console.log("error---------------    ", error)
    throw error;
    return false;
  }
}
const userPhoneVerificationByOtp = async (phone) => {
  try {
    const otp = generateCustomCode(6);
    const PhoneExists = await PhoneOtpVerifySchema.findOne({ phone: phone })
    if (PhoneExists) {
      client.messages
        .create({
          body:
            "Dear User, OTP for registration on Survey Management is : " +
            otp +
            ". Do not share it with anyone.",
          from: config.twilio_from_number,
          to: phone,
        })
      await PhoneOtpVerifySchema.findOneAndUpdate(
        { phone: phone },
        { otp: otp }
      );
      return true;
    } else {
      client.messages
        .create({
          body:
            "Dear User, OTP for registration on Survey Management is : " +
            otp +
            ". Do not share it with anyone.",
          from: config.twilio_from_number,
          to: phone,
        })
      const phoneBody = {
        phone: phone,
        otp: otp
      }
      await PhoneOtpVerifySchema.create(phoneBody);
      return true;
    }
  } catch (error) {
    // console.log("error---------------    ",  error)
    return false;
  }
};

const userPhoneOtpVerify = async (phone, otp) => {
  try {
    const otpExist = await PhoneOtpVerifySchema.findOne(
      { phone: phone, otp: otp }
    );
    if (otpExist) {
      return otpExist;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const deleteAfterUserPhoneOtpVerify = async (phone, otp) => {
  return PhoneOtpVerifySchema.findOneAndDelete({ phone: phone, otp: otp })
};

exports.updateOtpUserFunc = async (id, otp) => {
  try {
    await User.findByIdAndUpdate(
      { _id: id },
      { otp: otp }
    );
    return true;
    const EmailExists = await EmailOtpVerifySchema.findOne({ email: email })
    if (EmailExists) {
      await EmailOtpVerifySchema.findOneAndUpdate(
        { email: email },
        { otp: otp }
      );
      return true;
    } else {
      const emailBody = {
        email: email,
        otp: otp
      }
      await EmailOtpVerifySchema.create(emailBody);
      return true;
    }
  } catch (error) {
    // console.log("error---------------    ", error)
    return false;
  }
}
const updateOtpUser = async (id, otp) => {
  try {
    await User.findByIdAndUpdate(
      { _id: id },
      { otp: otp }
    );
    return true;
  } catch (error) {
    return false;
  }
};

const createUser = async (userBody, userFile) => {
  if (userBody.role == 'admin') {
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, customMessage.getTranslatedPhrase('EMAIL_ALLREADY_EXIST', config.getResponseLanguage()));
    }
    if (await User.isPhoneNumberTaken(userBody.phone)) {
      throw new ApiError(httpStatus.BAD_REQUEST, customMessage.getTranslatedPhrase('PHONE_ALLREADY_EXIST', config.getResponseLanguage()));
    }
    return User.create(userBody);

  } else {
    const age = calculateAge(userBody.dob);
    if (age < 16) {
      const errorMessage = "User must be at least 16 years old.";
      throw new ApiError(httpStatus.BAD_REQUEST, errorMessage);
    }
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, customMessage.getTranslatedPhrase('EMAIL_ALLREADY_EXIST', config.getResponseLanguage()));
    }
    if (await User.isPhoneNumberTaken(userBody.phone)) {
      throw new ApiError(httpStatus.BAD_REQUEST, customMessage.getTranslatedPhrase('PHONE_ALLREADY_EXIST', config.getResponseLanguage()));
    }
    if (userFile?.profile_image) {
      userBody.profile_image = userFile.profile_image
        ? userFile.profile_image.length > 0
          ? config.base_url +
          "/uploads/user-profile-image/" +
          userFile.profile_image[0].filename
          : ""
        : "";
    }
    // console.log(userBody,'+++++userBody');
    const newUser = await User.create(userBody);
    const adminEmail = await User.findOne({ role: "admin", isDelete: false })
    emailService.sendNewUserEmailNotification(newUser.email, adminEmail.email);
    return newUser;
  }
};


const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options, { isDelete: false });
  const resultUsers = await users.results.filter(user => user.isDelete === false);
  return resultUsers;
};

const getAllUserLists = async () => {
  const users = await User.find({ role: "user", isDelete: false });
  return users;
};

const getUserById = async (id) => {
  return User.findById(id);
};

const userOtpVerify = async (id, otp) => {
  try {
    const otpExist = await User.findOne(
      { _id: id, otp: otp },
    );
    if (otpExist) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

const getUserByEmail = async (email) => {
  return User.findOne({ email });
};
const getUserByEmailAndRole = async (email, role) => {
  return User.findOne({ email, role });
};

const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, customMessage.getTranslatedPhrase('NOT_A_USER', config.getResponseLanguage()));
  }

  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, customMessage.getTranslatedPhrase('EMAIL_ALLREADY_EXIST', config.getResponseLanguage()));
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const updateUser = async (userId, updateBody, uploadFiles) => {
  var obj = {};
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User not found, Please give a valid user id"
    );
  }
  if (updateBody.email) {
    if (await User.isEmailTakenAdmin(updateBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, customMessage.getTranslatedPhrase('EMAIL_ALLREADY_EXIST', config.getResponseLanguage()));
    }
    obj.email = updateBody.email;
  }
  if (updateBody.phone) {
    if (await User.isPhoneNumberTaken(updateBody.phone)) {
      throw new ApiError(httpStatus.BAD_REQUEST, customMessage.getTranslatedPhrase('PHONE_ALLREADY_EXIST', config.getResponseLanguage()));
    }
    obj.phone = updateBody.phone;
  }
  if (updateBody.first_name) {
    obj.first_name = updateBody.first_name;
  }
  if (updateBody.last_name) {
    obj.last_name = updateBody.last_name;
  }
  if (updateBody.country) {
    obj.country = updateBody.country;
  }
  if (updateBody.state) {
    obj.state = updateBody.state;
  }
  if (updateBody.zip_code) {
    obj.zip_code = updateBody.zip_code;
  }
  if (updateBody.height) {
    obj.height = updateBody.height;
  }
  if (updateBody.weight) {
    obj.weight = updateBody.weight;
  }
  if (updateBody.paypal_id) {
    obj.paypal_id = updateBody.paypal_id;
  }
  if (updateBody.address) {
    obj.address = updateBody.address;
  }
  if (updateBody.dob) {
    obj.dob = updateBody.dob;
  }
  if (updateBody.gender) {
    obj.gender = updateBody.gender;
  }
  if (updateBody.race) {
    obj.race = updateBody.race;
  }
  if (updateBody.ethnicity) {
    obj.ethnicity = updateBody.ethnicity;
  }
  if (updateBody.marital_status) {
    obj.marital_status = updateBody.marital_status;
  }
  if (updateBody.income) {
    obj.income = updateBody.income;
  }
  if (updateBody.education) {
    obj.education = updateBody.education;
  }
  if (updateBody.occupation) {
    obj.occupation = updateBody.occupation;
  }
  if (updateBody.sports) {
    obj.sports = updateBody.sports;
  }
  if (updateBody.athletics) {
    obj.athletics = updateBody.athletics;
  }
  if (updateBody.climbing) {
    obj.climbing = updateBody.climbing
  }
  if (updateBody.party) {
    obj.party = updateBody.party;
  }
  if (updateBody.outing) {
    obj.outing = updateBody.outing;
  }
  if (updateBody.cycling) {
    obj.cycling = updateBody.cycling;
  }
  if (uploadFiles?.profile_image) {
    const profile_image = uploadFiles.profile_image ? uploadFiles.profile_image.length > 0 ? config.base_url + "/uploads/user-profile-image/" + uploadFiles.profile_image[0].filename : "" : "";
    obj.profile_image = profile_image;
  }
  await User.findByIdAndUpdate(userId, obj, { new: true });
  return await getUserById(userId);
};

const updateDataByUserId = async (userId, updateBody, uploadFiles) => {
  var obj = {};
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User not found, Please give a valid user id"
    );
  }
  if (user.role !== "user") {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "User not found, Please give a valid user id"
    );
  }
  if (updateBody.email) {
    if (await User.isEmailTakenAdmin(updateBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, customMessage.getTranslatedPhrase('EMAIL_ALLREADY_EXIST', config.getResponseLanguage()));
    }
    obj.email = updateBody.email;
  }
  if (updateBody.phone) {
    if (await User.isPhoneNumberTaken(updateBody.phone)) {
      throw new ApiError(httpStatus.BAD_REQUEST, customMessage.getTranslatedPhrase('PHONE_ALLREADY_EXIST', config.getResponseLanguage()));
    }
    obj.phone = updateBody.phone;
  }
  if (updateBody.first_name) {
    obj.first_name = updateBody.first_name;
  }
  if (updateBody.last_name) {
    obj.last_name = updateBody.last_name;
  }
  if (updateBody.country) {
    obj.country = updateBody.country;
  }
  if (updateBody.state) {
    obj.state = updateBody.state;
  }
  if (updateBody.zip_code) {
    obj.zip_code = updateBody.zip_code;
  }
  if (updateBody.height) {
    obj.height = updateBody.height;
  }
  if (updateBody.weight) {
    obj.weight = updateBody.weight;
  }
  if (updateBody.paypal_id) {
    obj.paypal_id = updateBody.paypal_id;
  }
  if (updateBody.address) {
    obj.address = updateBody.address;
  }
  if (updateBody.dob) {
    obj.dob = updateBody.dob;
  }
  if (updateBody.gender) {
    obj.gender = updateBody.gender;
  }
  if (updateBody.race) {
    obj.race = updateBody.race;
  }
  if (updateBody.ethnicity) {
    obj.ethnicity = updateBody.ethnicity;
  }
  if (updateBody.marital_status) {
    obj.marital_status = updateBody.marital_status;
  }
  if (updateBody.income) {
    obj.income = updateBody.income;
  }
  if (updateBody.education) {
    obj.education = updateBody.education;
  }
  if (updateBody.occupation) {
    obj.occupation = updateBody.occupation;
  }
  if (updateBody.sports) {
    obj.sports = updateBody.sports;
  }
  if (updateBody.athletics) {
    obj.athletics = updateBody.athletics;
  }
  if (updateBody.climbing) {
    obj.climbing = updateBody.climbing
  }
  if (updateBody.party) {
    obj.party = updateBody.party;
  }
  if (updateBody.outing) {
    obj.outing = updateBody.outing;
  }
  if (updateBody.cycling) {
    obj.cycling = updateBody.cycling;
  }
  if (uploadFiles?.profile_image) {
    const profile_image = uploadFiles.profile_image ? uploadFiles.profile_image.length > 0 ? config.base_url + "/uploads/user-profile-image/" + uploadFiles.profile_image[0].filename : "" : "";
    obj.profile_image = profile_image;
  }
  await User.findByIdAndUpdate(userId, obj, { new: true });
  return await getUserById(userId);
};

const changePassword = async (id, password, newPassword, confirmPassword) => {
  try {
    const user = await getUserById(id);
    if (!user) {
      throw new ApiError(httpStatus.NOT_FOUND, customMessage.getTranslatedPhrase(
        "NOT_A_USER", config.getResponseLanguage()
      ));
    }
    if (newPassword != confirmPassword) {
      throw new ApiError(httpStatus.NOT_FOUND, customMessage.getTranslatedPhrase(
        "MATCH_PASSWORD_CONFIRM_PASSWORD_FAILED", config.getResponseLanguage()
      ));
    }
    if (!(await user.isPasswordMatch(password))) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect password");
    }
    // Hash New Password
    const hash = bcrypt.hashSync(newPassword);
    if (!hash) throw new ApiError(httpStatus.UNAUTHORIZED, "Internal Server Error!");
    await User.findByIdAndUpdate({ _id: id }, { password: hash });
    return true;
  } catch (error) {
    // console.log("error -------------  ", error)
    throw new ApiError(httpStatus.UNAUTHORIZED, error);
  }
};

const deleteUserById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, customMessage.getTranslatedPhrase('NOT_A_USER', config.getResponseLanguage()));

  }
  await User.findByIdAndUpdate(userId, { isDelete: true }, { new: true });
};

const removeAccount = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, customMessage.getTranslatedPhrase('NOT_A_USER', config.getResponseLanguage()));

  }
  await User.deleteOne({ _id: userId });
};

const addAdminUser = async (userBody) => {
  const adminPass = userBody.password;
  if (userBody.role == 'admin') {
    if (await User.isEmailTaken(userBody.email)) {
      throw new ApiError(httpStatus.BAD_REQUEST, customMessage.getTranslatedPhrase('EMAIL_ALLREADY_EXIST', config.getResponseLanguage()));
    }
    if (await User.isPhoneNumberTaken(userBody.phone)) {
      throw new ApiError(httpStatus.BAD_REQUEST, customMessage.getTranslatedPhrase('PHONE_ALLREADY_EXIST', config.getResponseLanguage()));
    }
    userBody.isEmailVerified = true;
    userBody.is_accept_terms_and_conditions = true;
    userBody.admin_created_by = userBody.id;
    const newAdminUser = await User.create(userBody);
    emailService.sendAdminDataToAdminUser(newAdminUser.email, newAdminUser.first_name + " " + newAdminUser.last_name, adminPass);
    return newAdminUser;
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, customMessage.getTranslatedPhrase('ROLE_ADMIN', config.getResponseLanguage()));
  }
};

const deleteAdminById = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, customMessage.getTranslatedPhrase('NOT_A_USER', config.getResponseLanguage()));

  }
  // if (user.isDelete == true) {
  //   throw new ApiError(httpStatus.NOT_FOUND, customMessage.getTranslatedPhrase('USER_ALLREADY_DELETED', config.getResponseLanguage()));

  // }
  return User.deleteOne({ _id: userId }).exec();
};

module.exports = {
  userEmailExists,
  userPhoneExists,
  userEmailVerificationByOtp,
  userEmailOtpVerify,
  deleteAfterUserEmailOtpVerify,
  userPhoneVerificationByOtp,
  userPhoneOtpVerify,
  deleteAfterUserPhoneOtpVerify,
  updateOtpUser,
  userOtpVerify,
  createUser,
  queryUsers,
  getAllUserLists,
  getUserById,
  getUserByEmail,
  updateUserById,
  updateUser,
  updateDataByUserId,
  changePassword,
  deleteUserById,
  getUserByEmailAndRole,
  removeAccount,
  addAdminUser,
  deleteAdminById,
};
