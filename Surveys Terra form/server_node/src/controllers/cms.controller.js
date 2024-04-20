const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const cmsService = require("../services/cms.service");
const customMessage = require("../utils/customMessage");
const config = require("../config/config");

const getContents = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const allCms = await cmsService.getContents();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("All_CMS", res_language),
    allCms,
  });
});
const getContentsById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await cmsService.getContent(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("All_CMS", res_language),
    cms,
  });
});
const getContentByName = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await cmsService.getContentByName(req.params.name);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("All_CMS", res_language),
    cms,
  });
});
const updateContentsById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await cmsService.updateContent(req.params.id, req.body, req.files);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("UPDATE_CMS", res_language),
    cms,
  });
});
const addNewCms = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await cmsService.addNewCms(req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("ADD_SUCCESS", res_language),
    cms,
  });
});
const deleteCms = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await cmsService.deleteCms(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DELETED_SUCCESSFULLY", res_language),
    cms,
  });
});
const uploadImageByCmsId = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  // console.log("req.files",req.files)
  const imagePaths = req.files.map(file => config.base_url + "/uploads/cms-images/" + file.filename);
  const cms = await cmsService.addCMSImage(req.params.id, imagePaths);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("UPDATE_CMS", res_language),
    cms,
  });
});
const removeImageByCmsId = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  // console.log("req.body.image_path",req.body.image_path)
  const cms = await cmsService.removeCMSImage(req.params.id, req.body.image_path);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("UPDATE_CMS", res_language)
  });
});
const addNewContactUs = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const cms = await cmsService.addNewContactUs(req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("ADD_SUCCESS", res_language),
  });
});
const getAllContactUsData = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const contactUsData = await cmsService.getContactUsAllUserData();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
    contactUsData,
  });
});
const getAllSocialLinkData = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const socialLinkData = await cmsService.getSocialLinkAllUserData();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
    socialLinkData,
  });
});
const addNewSocialLink = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const socialLink = await cmsService.updateNewSocialLink(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("UPDATED_SUCCESSFULLY", res_language),
    socialLink,
  });
});

module.exports = {
  getContents,
  getContentsById,
  updateContentsById,
  getContentByName,
  uploadImageByCmsId,
  removeImageByCmsId,
  addNewCms,
  deleteCms,
  addNewContactUs,
  getAllContactUsData,
  getAllSocialLinkData,
  addNewSocialLink,
};