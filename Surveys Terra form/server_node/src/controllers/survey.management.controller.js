const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const surveyService = require("../services/survey.management.service");
const customMessage = require("../utils/customMessage");
const config = require("../config/config");


const addNewSurveyType = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const surveyType = await surveyService.addNewSurveyType(req.body);
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("ADD_SUCCESS", res_language),
        surveyType,
    });
});

const getAllSurveyType = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const allSurveyType = await surveyService.getAllSurveyType();
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
        allSurveyType,
    });
});

const getSurveyTypeById = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const surveyType = await surveyService.getSurveyType(req.params.id);
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("All_CATEGORY", res_language),
        surveyType,
    });
});

const updateSurveyTypeId = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const updateCategory = await surveyService.updateSurveyTypeId(
        req.query,
        req.body,
        req.files
    );
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("UPDATED_SUCCESSFULLY", res_language),
        updateCategory,
    });
});

const deleteSurveyTypeById = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    await surveyService.deleteSurveyTypeById(req.body.type_id);
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("DELETED_SUCCESSFULLY", res_language),
    });
});

const addNewSurveyTag = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const surveyType = await surveyService.addNewSurveyTag(req.body);
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("ADD_SUCCESS", res_language),
        surveyType,
    });
});

const getAllSurveyTag = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const allSurveyType = await surveyService.getAllSurveyTag();
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
        allSurveyType,
    });
});

const getSurveyTagById = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const surveyType = await surveyService.getSurveyTagById(req.params.id);
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("All_CATEGORY", res_language),
        surveyType,
    });
});

const updateSurveyTagId = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const updateCategory = await surveyService.updateSurveyTagId(
        req.query,
        req.body,
        req.files
    );
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("UPDATED_SUCCESSFULLY", res_language),
        updateCategory,
    });
});

const deleteSurveyTagById = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    await surveyService.deleteSurveyTagById(req.body.tag_id);
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("DELETED_SUCCESSFULLY", res_language),
    });
});



const addNewSurveyCategory = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const surveyCategory = await surveyService.addNewSurveyCategory(req.body, req.files);
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("ADD_SUCCESS", res_language),
        surveyCategory,
    });
});

const getSurveyCategoryById = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const surveyCategory = await surveyService.getSurveyCategory(req.params.id);
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
        surveyCategory,
    });
});

const getAllSurveyCategory = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const allCategory = await surveyService.getAllSurveyCategory();
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("All_CATEGORY", res_language),
        allCategory,
    });
});

const getAllActiveSurveyLists = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const allActiveCategory = await surveyService.getAllActiveSurveyLists(req.user._id);
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("All_CATEGORY", res_language),
        allActiveCategory,
    });
});

const getUserAllRewardLists = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const allRewardLists = await surveyService.getUserAllRewardLists(req.user._id);
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("All_CATEGORY", res_language),
        allRewardLists,
    });
});

const updateSurveyCategoryId = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const updateCategory = await surveyService.updateCategory(
        req.query,
        req.body,
        req.files
    );
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("UPDATED_SUCCESSFULLY", res_language),
        updateCategory,
    });
});

const deleteSurveyCategoryById = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    await surveyService.deleteSurveyCategoryById(req.body.category_id);
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("DELETED_SUCCESSFULLY", res_language),
    });
});

const addNewUserSurveyParticipation = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const addUserSurveyRewardData = await surveyService.addNewUserSurveyParticipation(req.user._id, req.body);
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("ADD_SUCCESS", res_language),
        addUserSurveyRewardData,
    });
});

const getAllUserParticipationListsBySurveyId = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const allParticipationList = await surveyService.getAllUserParticipationListsBySurveyId(req.params.surveyId);
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("All_CATEGORY", res_language),
        allParticipationList,
    });
});

const getRewardCategoryById = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const getRewardDetails = await surveyService.getRewardCategoryById(req.params.rewardId);
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
        getRewardDetails,
    });
});

const updateRewardCategoryId = catchAsync(async (req, res) => {
    config.setResponseLanguage(req.get("res_language"));
    const res_language = config.getResponseLanguage();
    const updateRewardCategory = await surveyService.updateRewardCategoryId(
        req.params.rewardId,
        req.body,
    );
    res.status(httpStatus.OK).send({
        status: true,
        message: customMessage.getTranslatedPhrase("UPDATED_SUCCESSFULLY", res_language),
        updateRewardCategory,
    });
});

module.exports = {
    addNewSurveyType,
    getAllSurveyType,
    getSurveyTypeById,
    updateSurveyTypeId,
    deleteSurveyTypeById,
    addNewSurveyTag,
    getAllSurveyTag,
    getSurveyTagById,
    updateSurveyTagId,
    deleteSurveyTagById,
    addNewSurveyCategory,
    getSurveyCategoryById,
    getAllSurveyCategory,
    getAllActiveSurveyLists,
    getUserAllRewardLists,
    updateSurveyCategoryId,
    deleteSurveyCategoryById,
    addNewUserSurveyParticipation,
    getAllUserParticipationListsBySurveyId,
    getRewardCategoryById,
    updateRewardCategoryId,
};
