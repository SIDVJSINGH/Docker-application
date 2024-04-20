const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const surveyController = require('../controllers/survey.management.controller');
const surveyValidation = require('../validations/survey.management.validation');
const uploadSurveyCategoryImage = require('../middlewares/uploaders/uploadSurveyCategoryImage');

const router = express.Router();

///// ******************* add new survey type ****************

router
    .route('/add/new-survey-type')
    .post(auth('addSurveyType'), validate(surveyValidation.newSurveyTypeAdd), surveyController.addNewSurveyType);

router
    .route('/getAllSurveyType/')
    .get(surveyController.getAllSurveyType);

router
    .route('/getAllSurveyType/:id')
    .get(surveyController.getSurveyTypeById);

router
    .route('/updateSurveyType')
    .post(auth('updateSurveyType'), uploadSurveyCategoryImage.fields([{ name: 'image', maxCount: 1 }]), validate(surveyValidation.updateSurveyTypeId), surveyController.updateSurveyTypeId);

router
    .route('/deleteSurveyType')
    .post(auth('deleteSurveyType'), validate(surveyValidation.deleteSurveyTypeId), surveyController.deleteSurveyTypeById);


///// ******************* add new survey tag *****************

router
    .route('/add/new-survey-tag')
    .post(auth('addSurveyTag'), validate(surveyValidation.newSurveyTagAdd), surveyController.addNewSurveyTag);

router
    .route('/getAllSurveyTag/')
    .get(surveyController.getAllSurveyTag);

router
    .route('/getAllSurveyTag/:id')
    .get(surveyController.getSurveyTagById);

router
    .route('/updateSurveyTag')
    .post(auth('updateSurveyTag'), uploadSurveyCategoryImage.fields([{ name: 'image', maxCount: 1 }]), validate(surveyValidation.updateSurveyTagId), surveyController.updateSurveyTagId);

router
    .route('/deleteSurveyTag')
    .post(auth('deleteSurveyTag'), validate(surveyValidation.deleteSurveyTagId), surveyController.deleteSurveyTagById);


///// ******************* add new survey category **************
router
    .route('/add/new-survey-category')
    .post(auth('addSurveyCategory'), uploadSurveyCategoryImage.fields([{ name: 'image', maxCount: 1 }]), validate(surveyValidation.newSurveyCategoryAdd), surveyController.addNewSurveyCategory);

router
    .route('/:id')
    .get(surveyController.getSurveyCategoryById);

router
    .route('/')
    .get(surveyController.getAllSurveyCategory);

router
    .route('/get/user/AllActiveSurveyLists/')
    .get(auth('getUserAllActiveSurveyListsByAgeRange'), surveyController.getAllActiveSurveyLists);

router
    .route('/get/user/AllRewardLists')
    .get(auth('getUserAllRewardLists'), surveyController.getUserAllRewardLists);

router
    .route('/updateSurveyCategory')
    .post(auth('updateSurveyCategory'), uploadSurveyCategoryImage.fields([{ name: 'image', maxCount: 1 }]), validate(surveyValidation.updateSurveyCategoryId), surveyController.updateSurveyCategoryId);

router
    .route('/deleteSurveyCategory')
    .post(auth('deleteSurveyCategory'), validate(surveyValidation.deleteSurveyCategoryId), surveyController.deleteSurveyCategoryById);

router
    .route('/add/user-survey-participation')
    .post(auth('addUserSurveyParticipation'), validate(surveyValidation.newUserSurveyParticipationAdd), surveyController.addNewUserSurveyParticipation);

router
    .route('/get/user/AllParticipationLists/:surveyId')
    .get(auth('getUserAllParticipationListsBySurveyId'), surveyController.getAllUserParticipationListsBySurveyId);

router
    .route('/getRewardCategory/:rewardId')
    .get(auth('getRewardCategoryById'), surveyController.getRewardCategoryById);

router
    .route('/updateRewardCategory/:rewardId')
    .post(auth('updateRewardCategory'), validate(surveyValidation.updateRewardCategoryId), surveyController.updateRewardCategoryId);

module.exports = router;