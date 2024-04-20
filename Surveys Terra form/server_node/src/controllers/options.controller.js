const httpStatus = require("http-status");
const pick = require("../utils/pick");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const optionsService = require("../services/options.service");
const customMessage = require("../utils/customMessage");
const config = require("../config/config");

const getStateOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const allOptionsList = await optionsService.getStateOption();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
    allOptionsList,
  });
});
const getcountryOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const allOptionsList = await optionsService.getcountryOption();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
    allOptionsList,
  });
});

const getSportsOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const allOptionsList = await optionsService.getSportsOption();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
    allOptionsList,
  });
});

const getRaceOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const allOptionsList = await optionsService.getRaceOption();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
    allOptionsList,
  });
});

const getEthnicityOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const allOptionsList = await optionsService.getEthnicityOption();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
    allOptionsList,
  });
});

const getIncomeStatusOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const allOptionsList = await optionsService.getIncomeStatusOption();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
    allOptionsList,
  });
});

const getAthleticsStatusOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const allOptionsList = await optionsService.getAthleticsStatusOption();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
    allOptionsList,
  });
});

const getPartyStatusOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  const allOptionsList = await optionsService.getPartyStatusOption();
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DEFAULT_SUCCESS", res_language),
    allOptionsList,
  });
});




const getStateOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.getStateOptionById(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("All_CMS", res_language),
    cms,
  });
});
const getcountryOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.getcountryOptionById(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("All_CMS", res_language),
    cms,
  });
});

const getSportsOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.getSportsOptionById(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("All_CMS", res_language),
    cms,
  });
});

const getRaceOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.getRaceOptionById(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("All_CMS", res_language),
    cms,
  });
});

const getEthnicityOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.getEthnicityOptionById(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("All_CMS", res_language),
    cms,
  });
});

const getIncomeStatusOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.getIncomeStatusOptionById(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("All_CMS", res_language),
    cms,
  });
});

const getAthleticsStatusOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.getAthleticsStatusOptionById(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("All_CMS", res_language),
    cms,
  });
});

const getPartyStatusOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.getPartyStatusOptionById(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("All_CMS", res_language),
    cms,
  });
});



const addNewStateOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.addNewStateOption(req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("ADD_SUCCESS", res_language),
    cms,
  });
});
const addNewcountryOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.addNewcountryOption(req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("ADD_SUCCESS", res_language),
    cms,
  });
});

const addNewSportsOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.addNewSportsOption(req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("ADD_SUCCESS", res_language),
    cms,
  });
});

const addNewRaceOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.addNewRaceOption(req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("ADD_SUCCESS", res_language),
    cms,
  });
});

const addNewEthnicityOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.addNewEthnicityOption(req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("ADD_SUCCESS", res_language),
    cms,
  });
});

const addNewIncomeStatusOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.addNewIncomeStatusOption(req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("ADD_SUCCESS", res_language),
    cms,
  });
});

const addNewAthleticsStatusOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.addNewAthleticsStatusOption(req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("ADD_SUCCESS", res_language),
    cms,
  });
});

const addNewPartyStatusOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const cms = await optionsService.addNewPartyStatusOption(req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("ADD_SUCCESS", res_language),
    cms,
  });
});

const updateStateOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const socialLink = await optionsService.updateStateOptionById(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("UPDATED_SUCCESSFULLY", res_language),
    socialLink,
  });
});
const updatecountryOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const socialLink = await optionsService.updatecountryOptionById(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("UPDATED_SUCCESSFULLY", res_language),
    socialLink,
  });
});

const updateSportsOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const socialLink = await optionsService.updateSportsOptionById(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("UPDATED_SUCCESSFULLY", res_language),
    socialLink,
  });
});

const updateRaceOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const socialLink = await optionsService.updateRaceOptionById(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("UPDATED_SUCCESSFULLY", res_language),
    socialLink,
  });
});

const updateEthnicityOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const socialLink = await optionsService.updateEthnicityOptionById(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("UPDATED_SUCCESSFULLY", res_language),
    socialLink,
  });
});

const updateIncomeStatusOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const socialLink = await optionsService.updateIncomeStatusOptionById(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("UPDATED_SUCCESSFULLY", res_language),
    socialLink,
  });
});

const updateAthleticsStatusOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const socialLink = await optionsService.updateAthleticsStatusOptionById(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("UPDATED_SUCCESSFULLY", res_language),
    socialLink,
  });
});

const updatePartyStatusOptionById = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  const socialLink = await optionsService.updatePartyStatusOptionById(req.params.id, req.body);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("UPDATED_SUCCESSFULLY", res_language),
    socialLink,
  });
});

const deleteStateOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  await optionsService.deleteStateOption(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DELETED_SUCCESSFULLY", res_language),
  });
});
const deletecountryOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  await optionsService.deletecountryOption(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DELETED_SUCCESSFULLY", res_language),
  });
});

const deleteSportsOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  await optionsService.deleteSportsOption(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DELETED_SUCCESSFULLY", res_language),
  });
});

const deleteRaceOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  await optionsService.deleteRaceOption(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DELETED_SUCCESSFULLY", res_language),
  });
});

const deleteEthnicityOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  await optionsService.deleteEthnicityOption(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DELETED_SUCCESSFULLY", res_language),
  });
});

const deleteIncomeStatusOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  await optionsService.deleteIncomeStatusOption(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DELETED_SUCCESSFULLY", res_language),
  });
});

const deleteAthleticsStatusOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  await optionsService.deleteAthleticsStatusOption(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DELETED_SUCCESSFULLY", res_language),
  });
});

const deletePartyStatusOption = catchAsync(async (req, res) => {
  config.setResponseLanguage(req.get("res_language"));
  const res_language = config.getResponseLanguage();
  // console.log("req.params.id",req.params.id)
  await optionsService.deletePartyStatusOption(req.params.id);
  res.status(httpStatus.OK).send({
    status: true,
    message: customMessage.getTranslatedPhrase("DELETED_SUCCESSFULLY", res_language),
  });
});




module.exports = {
  getStateOption,
  getcountryOption,
  getSportsOption,
  getRaceOption,
  getEthnicityOption,
  getIncomeStatusOption,
  getAthleticsStatusOption,
  getPartyStatusOption,
  getStateOptionById,
  getcountryOptionById,
  getSportsOptionById,
  getRaceOptionById,
  getEthnicityOptionById,
  getIncomeStatusOptionById,
  getAthleticsStatusOptionById,
  getPartyStatusOptionById,
  addNewStateOption,
  addNewcountryOption,
  addNewSportsOption,
  addNewRaceOption,
  addNewEthnicityOption,
  addNewIncomeStatusOption,
  addNewAthleticsStatusOption,
  addNewPartyStatusOption,
  updateStateOptionById,
  updatecountryOptionById,
  updateSportsOptionById,
  updateRaceOptionById,
  updateEthnicityOptionById,
  updateIncomeStatusOptionById,
  updateAthleticsStatusOptionById,
  updatePartyStatusOptionById,
  deleteStateOption,
  deletecountryOption,
  deleteSportsOption,
  deleteRaceOption,
  deleteEthnicityOption,
  deleteIncomeStatusOption,
  deleteAthleticsStatusOption,
  deletePartyStatusOption,
};