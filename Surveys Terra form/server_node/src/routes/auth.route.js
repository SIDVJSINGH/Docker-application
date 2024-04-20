const express = require("express");
const validate = require("../middlewares/validate");
const authValidation = require("../validations/auth.validation");
const authController = require("../controllers/auth.controller");
const auth = require("../middlewares/auth");
const registrationUploader = require("../middlewares/uploaders/registration.uploader");

const router = express.Router();

router.post("/register", registrationUploader.fields([{ name: 'profile_image', maxCount: 1 }]), validate(authValidation.register), authController.register);

router.post("/login", validate(authValidation.login), authController.login);

router.post("/logout", validate(authValidation.logout), authController.logout);

router.post("/refresh-tokens", validate(authValidation.refreshTokens), authController.refreshTokens);

router.post("/forgot-password", validate(authValidation.forgotPassword), authController.forgotPassword );

router.post('/verify-otp', validate(authValidation.verifyOtp), authController.verifyOtp);

router.post("/reset-password", validate(authValidation.resetPassword), authController.resetPassword);

router.get("/user/get-profile-details/", auth('getUserDetails'),  authController.getUser);

router.post('/update-profile', auth('updateUserDetails'), registrationUploader.fields([{ name: 'profile_image', maxCount: 1 }]), validate(authValidation.updateProfile), authController.updateProfile);

router.post('/update-profile/:id', auth('addAdminUser'), registrationUploader.fields([{ name: 'profile_image', maxCount: 1 }]), validate(authValidation.updateProfile), authController.updateProfileOnUserId);

router.post('/change-password', auth('changePassword'), validate(authValidation.changePassword), authController.changePassword);

router.post('/send-verification-email', validate(authValidation.sendVerifyEmail), authController.sendVerificationEmail);

router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);

router.post('/send-verification-phone', validate(authValidation.sendVerifyPhone), authController.sendVerificationPhone);

router.post('/verify-phone', validate(authValidation.verifyPhone), authController.verifyPhone);

router.get("/user/get-total-registered-users/", auth('getTotalRegisteredUsers'),  authController.getTotalRegisteredUsers);

router.get("/user/get-total-survey-created/", auth('getTotalSurveyCreated'),  authController.getTotalSurveyCreated);

router.get("/user/get-total-survey-completed/", auth('getTotalSurveyCompleted'),  authController.getTotalSurveyCompleted);

router.post('/remove-account', auth('removeAccount'), authController.removeAccount);

router.post("/add-admin", auth('addAdminUser'), validate(authValidation.addAdmin), authController.addAdmin);

router.get("/admin/get-all-admin-list/", auth('getAllAdminLists'),  authController.getAllAdminLists);

router.get('/user/all-user-lists/', auth('getUsers'),authController.allUserData);

router.post("/delete-admin/:id", auth('addAdminUser'), authController.deleteAdmin);

module.exports = router;
