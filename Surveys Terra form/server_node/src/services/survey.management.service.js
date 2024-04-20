const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const SurveyType = require("../models/survey.type.management.model");
const SurveyTag = require("../models/survey.tag.management.model");
const surveyCategory = require("../models/survey.management.model");
const rewardCategory = require("../models/reward.management.model");
const user = require("../models/user.model");
const emailService = require("./email.service");
const he = require("he");
const config = require("../config/config");
const forEndSurvey = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayDateString = `${today.getDate()}-${today.getMonth() + 1
    }-${today.getFullYear()}`;
  const allSurveyEndData = await surveyCategory.model
    .find({
      isDelete: false,
      isStatusComplete: false,
      end_date_time: { $regex: todayDateString },
    })
    .sort("-1");
  if (allSurveyEndData.length > 0) {
    allSurveyEndData.forEach(async (element) => {
      // console.log(element.end_date_time, "++++end_date_time");
      await surveyCategory.model.findOneAndUpdate(
        { end_date_time: element.end_date_time },
        { isStatusComplete: true }
      );
    });
  }
};
const interval = setInterval(forEndSurvey, 1000);
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

exports.addNewSurveyType = async (element) => {
  const surveyTypeNameExists = await SurveyType.model.findOne({
    type_name: element.type_name,
    isDelete: false,
  });
  if (surveyTypeNameExists) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `This ${element.type_name} name already exist!`
    );
  }
  const insertObj = {
    type_name: element?.type_name,
  };
  return await SurveyType.model.create(insertObj);
};

exports.getSurveyType = (id) =>
  SurveyType.model
    .findById(id)
    .select("_id type_name image isActive isDelete")
    .exec();

exports.getAllSurveyType = (_) =>
  SurveyType.model.find({ isActive: true, isDelete: false }).lean().exec();

exports.updateSurveyTypeId = async (queryId, updateBody, uploadFiles) => {
  const typeId = queryId.type_id;
  var obj = {};
  const typeInfo = await SurveyType.model.findById(typeId);
  if (!typeInfo) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Id not found, Please give a valid survey type id"
    );
  }
  if (updateBody.type_name) {
    const typeNameExist = await SurveyType.model.findOne({
      type_name: updateBody.type_name,
      isDelete: false,
    });
    if (typeNameExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `This "${updateBody.type_name}" already exists!`
      );
    }
    obj.type_name = updateBody.type_name;
  }
  if (updateBody.isActive) {
    obj.isActive = updateBody.isActive;
  }
  if (uploadFiles?.image) {
    const survey_type_image = uploadFiles.image
      ? uploadFiles.image.length > 0
        ? config.base_url +
        "/uploads/survey-category-image/" +
        uploadFiles.image[0].filename
        : ""
      : "";
    obj.image = survey_type_image;
  }
  await SurveyType.model.findByIdAndUpdate(typeId, obj, { new: true });
  return await SurveyType.model.findById(typeId);
};

exports.deleteSurveyTypeById = async (typeId) => {
  const itemExist = await SurveyType.model.findOne({
    _id: typeId,
  });
  if (!itemExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Provide a valid survey type id`);
  }
  if (itemExist.isDelete === true) {
    throw new ApiError(httpStatus.NOT_FOUND, `This is already deleted`);
  }
  await SurveyType.model.findByIdAndUpdate(
    typeId,
    { isDelete: true },
    { new: true }
  );
  return await SurveyType.model.findById(typeId);
};

exports.addNewSurveyTag = async (element) => {
  const surveyTypeNameExists = await SurveyTag.model.findOne({
    tag_name: element.tag_name,
    isDelete: false,
  });
  if (surveyTypeNameExists) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `This ${element.tag_name} name already exist!`
    );
  }
  const insertObj = {
    tag_name: element?.tag_name,
  };
  return await SurveyTag.model.create(insertObj);
};

exports.getSurveyTagById = (id) =>
  SurveyTag.model
    .findById(id)
    .select("_id tag_name image isActive isDelete")
    .exec();

exports.getAllSurveyTag = (_) =>
  SurveyTag.model.find({ isActive: true, isDelete: false }).lean().exec();

exports.updateSurveyTagId = async (queryId, updateBody, uploadFiles) => {
  const tagId = queryId.tag_id;
  var obj = {};
  const tagInfo = await SurveyTag.model.findById(tagId);
  if (!tagInfo) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Id not found, Please give a valid survey tag id"
    );
  }
  if (updateBody.tag_name) {
    const tagNameExist = await SurveyTag.model.findOne({
      tag_name: updateBody.tag_name,
      isDelete: false,
    });
    if (tagNameExist) {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        `This "${updateBody.tag_name}" already exists!`
      );
    }
    obj.tag_name = updateBody.tag_name;
  }
  if (updateBody.isActive) {
    obj.isActive = updateBody.isActive;
  }
  if (uploadFiles?.image) {
    const survey_tag_image = uploadFiles.image
      ? uploadFiles.image.length > 0
        ? config.base_url +
        "/uploads/survey-category-image/" +
        uploadFiles.image[0].filename
        : ""
      : "";
    obj.image = survey_tag_image;
  }
  await SurveyTag.model.findByIdAndUpdate(tagId, obj, { new: true });
  return await SurveyTag.model.findById(tagId);
};

exports.deleteSurveyTagById = async (tagId) => {
  const itemExist = await SurveyTag.model.findOne({
    _id: tagId,
  });
  if (!itemExist) {
    throw new ApiError(httpStatus.NOT_FOUND, `Provide a valid survey tag id`);
  }
  if (itemExist.isDelete === true) {
    throw new ApiError(httpStatus.NOT_FOUND, `This is already deleted`);
  }
  await SurveyTag.model.findByIdAndUpdate(
    tagId,
    { isDelete: true },
    { new: true }
  );
  return await SurveyTag.model.findById(tagId);
};

exports.addNewSurveyCategory = async (element, updateFiles) => {
  const surveyNameExists = await surveyCategory.model.findOne({
    title: element.title,
    isDelete: false,
  });
  if (surveyNameExists) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `This ${element.title} name already exist!`
    );
  }
  var obj = {};
  if (updateFiles?.image) {
    obj = updateFiles.image
      ? updateFiles.image.length > 0
        ? config.base_url +
        "/uploads/survey-category-image/" +
        updateFiles.image[0].filename
        : ""
      : "";
  }
  const insertObj = {
    title: element?.title,
    survey_type_id: element?.survey_type_id,
    survey_description: element?.survey_description,
    survey_tag_id: element?.survey_tag_id,
    start_date_time: element?.start_date_time,
    end_date_time: element?.end_date_time,
    complete_time: element?.complete_time,
    min_age_range: element?.min_age_range,
    max_age_range: element?.max_age_range,
    url: element?.url,
    image: obj ? obj : "",
  };
  return await surveyCategory.model.create(insertObj);
};

exports.getSurveyCategory = (id) =>
  surveyCategory.model
    .findById(id)
    .populate("survey_type_id")
    .populate("survey_tag_id")
    .select(
      "_id title survey_type_id survey_description survey_tag_id start_date_time end_date_time complete_time min_age_range max_age_range url image isActive isStatusComplete isDelete"
    )
    .exec();

exports.getAllSurveyCategory = (_) =>
  surveyCategory.model
    .find({ isDelete: false })
    .populate("survey_type_id")
    .populate("survey_tag_id")
    .lean()
    .exec();

exports.getAllActiveSurveyLists = async (userId) => {
  const userIdCheck = await user.findOne({ _id: userId, isDelete: false });
  if (!userIdCheck) {
    throw new ApiError(httpStatus.NOT_FOUND, `Provide a valid user token id`);
  }
  const userAge = calculateAge(userIdCheck.dob);
  const query = {
    $and: [
      { isActive: true },
      { isStatusComplete: false },
      { isDelete: false },
      { min_age_range: { $lte: userAge } },
      { max_age_range: { $gte: userAge } },
    ],
  };
  const allSurveyDataAgeRange = await surveyCategory.model
    .find(query)
    .populate("survey_type_id")
    .populate("survey_tag_id")
    .lean();
  return allSurveyDataAgeRange;
};

exports.getUserAllRewardLists = async (id) => {
  const obj = {
    total_Reward_Value: 0,
    reward_details: [],
  };
  return await rewardCategory.model
    .find({ user_id: id })
    .populate("survey_id")
    .populate({
      path: "survey_id",
      populate: { path: "survey_tag_id" },
    })
    .exec()
    .then((rewardDetails) => {
      // if (rewardDetails.length === 0) {
      //     console.log('No records found for the user.');
      //     throw new ApiError(
      //         httpStatus.NOT_FOUND,
      //         `No records found for the user.`
      //     );
      // }

      // Calculate the total "reward_earned_value"
      const totalRewardValue = rewardDetails.reduce(
        (total, reward) => total + reward.reward_earned_value,
        0
      );
      obj.total_Reward_Value = totalRewardValue;
      obj.reward_details = rewardDetails;
      return obj;
    })
    .catch((err) => {
      // console.error("err===>  ", err);
      throw new ApiError(httpStatus.NOT_FOUND, `${err}`);
    });
};

exports.updateCategory = async (queryId, updateBody, uploadFiles) => {
  const categoryId = queryId.category_id;
  var obj = {};
  const categoryInfo = await surveyCategory.model.findById(categoryId);
  if (!categoryInfo) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Id not found, Please give a valid survey category id"
    );
  }
  if (updateBody.title) {
    // const categoryNameExist = await surveyCategory.model.findOne({
    //   title: updateBody.title,
    //   isDelete: false,
    // });
    // if (categoryNameExist) {
    //   throw new ApiError(
    //     httpStatus.BAD_REQUEST,
    //     `This "${updateBody.title}" already exists!`
    //   );
    // }
    obj.title = updateBody.title;
  }
  if (updateBody.survey_description) {
    obj.survey_description = updateBody.survey_description;
  }
  if (updateBody.min_age_range) {
    obj.min_age_range = updateBody.min_age_range;
  }
  if (updateBody.max_age_range) {
    obj.max_age_range = updateBody.max_age_range;
  }
  if (updateBody.start_date_time) {
    obj.start_date_time = updateBody.start_date_time;
  }
  if (updateBody.end_date_time) {
    obj.end_date_time = updateBody.end_date_time;
  }
  if (updateBody.complete_time) {
    obj.complete_time = updateBody.complete_time;
  }
  if (updateBody.url) {
    obj.url = updateBody.url;
  }
  if (updateBody.isActive) {
    obj.isActive = updateBody.isActive;
  }
  if (updateBody.isStatusComplete) {
    obj.isStatusComplete = updateBody.isStatusComplete;
  }
  if (uploadFiles?.image) {
    const survey_image = uploadFiles.image
      ? uploadFiles.image.length > 0
        ? config.base_url +
        "/uploads/survey-category-image/" +
        uploadFiles.image[0].filename
        : ""
      : "";
    obj.image = survey_image;
  }
  await surveyCategory.model.findByIdAndUpdate(categoryId, obj, { new: true });
  return await surveyCategory.model.findById(categoryId);
};

exports.deleteSurveyCategoryById = async (categoryId) => {
  const itemExist = await surveyCategory.model.findOne({
    _id: categoryId,
  });
  if (!itemExist) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      `Provide a valid survey category id`
    );
  }
  if (itemExist.isDelete == true) {
    throw new ApiError(httpStatus.NOT_FOUND, `This is already deleted`);
  }
  await surveyCategory.model.findByIdAndUpdate(
    categoryId,
    { isDelete: true },
    { new: true }
  );
  return await surveyCategory.model.findById(categoryId);
};

exports.addNewUserSurveyParticipation = async (userId, reqBody) => {
  const userIdCheck = await user.findOne({ _id: userId, isDelete: false });
  const surveyCategoryIdCheck = await surveyCategory.model.findOne({ _id: reqBody?.survey_id, isActive: true, isDelete: false })
  const sameSurveyParticipateUserCheck = await rewardCategory.model.findOne({ survey_id: reqBody?.survey_id, user_id: userId, isDelete: false })
  if (!userIdCheck) {
    throw new ApiError(httpStatus.NOT_FOUND, `Provide a valid user token id`);
  }
  if (!surveyCategoryIdCheck) {
    throw new ApiError(httpStatus.NOT_FOUND, `Provide a valid survey id`);
  }
  if (sameSurveyParticipateUserCheck) {
    throw new ApiError(httpStatus.NOT_FOUND, `This ${userIdCheck.first_name + " " + userIdCheck.last_name} already participate once in this survey - ${surveyCategoryIdCheck.title}`);
  }
  const insertObj = {
    survey_id: reqBody?.survey_id,
    user_id: userIdCheck._id,
    submitted_date_time: reqBody?.submitted_date_time,
    survey_participate_status: true,
  };
  // return await rewardCategory.model.create(insertObj);
  const rewardDtls = await rewardCategory.model.create(insertObj);
  surveyCategoryIdCheck.participants_list.push(rewardDtls);
  return await Promise.all([surveyCategoryIdCheck.save(), rewardDtls.save()]);
};

exports.getAllUserParticipationListsBySurveyId = async (id) => {
  const surveyIdCheck = await rewardCategory.model
    .find({ survey_id: id, isDelete: false })
    .populate("survey_id")
    .populate("survey_id.survey_type_id")
    .populate("survey_id.survey_tag_id")
    .populate("user_id");
  // console.log("survey id data ====>   ", surveyIdCheck);
  return surveyIdCheck;
};

exports.getRewardCategoryById = (id) =>
  rewardCategory.model
    .findById(id)
    .populate("survey_id")
    .populate("user_id")
    .select(
      "_id survey_id user_id submitted_date_time status reward_status reward_earned_value isDelete"
    )
    .exec();

exports.updateRewardCategoryId = async (rewardId, updateBody) => {
  var obj = {};
  const rewardExists = await rewardCategory.model.findById(rewardId);
  if (!rewardExists) {
    throw new ApiError(
      httpStatus.NOT_FOUND,
      "Id not found, Please give a valid reward category id"
    );
  }
  if (updateBody.status) {
    if (
      updateBody.status != "completed" &&
      updateBody.status != "ongoing" &&
      updateBody.status != "rejected"
    ) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "status should be completed|ongoing|rejected."
      );
    }
    obj.status = updateBody.status;
  }
  if (updateBody.reward_status) {
    if (
      updateBody.reward_status != "paid" &&
      updateBody.reward_status != "unpaid"
    ) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        "Reward status should be paid|unpaid."
      );
    }
    obj.reward_status = updateBody.reward_status;
  }
  if (updateBody.reward_earned_value) {
    obj.reward_earned_value = updateBody.reward_earned_value;
  }
  await rewardCategory.model.findByIdAndUpdate(rewardId, obj, { new: true });
  const getRewardData = await rewardCategory.model.findById(rewardId);
  const userEmail = await user.findById(getRewardData.user_id);
  const surveyDetails = await surveyCategory.model.findById(getRewardData.survey_id);
  if (getRewardData.status == "rejected") {
    emailService.sendSurveyDeclinedByAdminToUSer(
      userEmail.email,
      userEmail.first_name + " " + userEmail.last_name,
      surveyDetails.title
    );
  }
  if (getRewardData.status == "completed") {
    emailService.sendSurveyRewardAddedByAdminToUSer(
      userEmail.email,
      userEmail.first_name + " " + userEmail.last_name,
      surveyDetails.title,
      getRewardData.reward_earned_value
    );
  }
  return getRewardData;
};
