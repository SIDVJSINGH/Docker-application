const Joi = require("joi");
const { objectId, userSurveyStatus } = require("./custom.validation");

const newSurveyTypeAdd = {
    body: Joi.object().keys({
        type_name: Joi.string().required(),
    })
};
const updateSurveyTypeId = {
    query: Joi.object().keys({
        type_id: Joi.string().required(),
    }),
};
const deleteSurveyTypeId = {
    body: Joi.object().keys({
        type_id: Joi.string().required()
    })
};
const newSurveyTagAdd = {
    body: Joi.object().keys({
        tag_name: Joi.string().required(),
    })
};
const updateSurveyTagId = {
    query: Joi.object().keys({
        tag_id: Joi.string().required(),
    }),
};
const deleteSurveyTagId = {
    body: Joi.object().keys({
        tag_id: Joi.string().required()
    })
};
const newSurveyCategoryAdd = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        survey_type_id: Joi.string().custom(objectId).required(),
        survey_description: Joi.string().required(),
        survey_tag_id: Joi.string().custom(objectId).required(),
        start_date_time: Joi.string().required(),
        end_date_time: Joi.string().required(),
        complete_time: Joi.string().required(),
        min_age_range: Joi.number().required(),
        max_age_range: Joi.number().required(),
        url: Joi.string().required(),
    })
};
const updateSurveyCategoryId = {
    query: Joi.object().keys({
        category_id: Joi.string().required(),
    }),
};
const deleteSurveyCategoryId = {
    body: Joi.object().keys({
        category_id: Joi.string().required()
    })
};
const newUserSurveyParticipationAdd = {
    body: Joi.object().keys({
        survey_id: Joi.string().custom(objectId).required(),
        submitted_date_time: Joi.string().required(),
        // user_id: Joi.string().custom(objectId).required(), // token id taken
        // status: Joi.string().custom(userSurveyStatus).required(),
    })
};
const updateRewardCategoryId = {
    body: Joi.object().keys({
        status: Joi.string().custom(userSurveyStatus),
        reward_earned_value: Joi.number(),
        reward_status: Joi.string(),
    })
};

module.exports = {
    newSurveyTypeAdd,
    updateSurveyTypeId,
    deleteSurveyTypeId,
    newSurveyTagAdd,
    updateSurveyTagId,
    deleteSurveyTagId,
    newSurveyCategoryAdd,
    updateSurveyCategoryId,
    deleteSurveyCategoryId,
    newUserSurveyParticipationAdd,
    updateRewardCategoryId,
};