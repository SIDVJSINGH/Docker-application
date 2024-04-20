const Joi = require("joi");
const {phoneNumber } = require("./custom.validation");


const getCmsId = {
  query: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
const newcountryOptionAdd = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    abbreviation: Joi.string().required(),
  })
};

const newStateOptionAdd = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    abbreviation: Joi.string().required(),
  })
};
const newSportsOptionAdd = {
  body: Joi.object().keys({
    label: Joi.string().required(),
    value: Joi.string().required(),
  })
};
const newRaceOptionAdd = {
  body: Joi.object().keys({
    label: Joi.string().required(),
    value: Joi.string().required(),
  })
};
const newEthnicityOptionAdd = {
  body: Joi.object().keys({
    label: Joi.string().required(),
    value: Joi.string().required(),
  })
};
const newIncomeStatusOptionAdd = {
  body: Joi.object().keys({
    label: Joi.string().required(),
    value: Joi.string().required(),
  })
};
const newAthleticsStatusOptionAdd = {
  body: Joi.object().keys({
    label: Joi.string().required(),
    value: Joi.string().required(),
  })
};
const newPartyStatusOptionAdd = {
  body: Joi.object().keys({
    label: Joi.string().required(),
    value: Joi.string().required(),
  })
};



const removeCmsImage = {
  body: Joi.object().keys({
    image_path: Joi.string().required(),
  })
};
const newContactUsAdd = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().required().email(),
    message: Joi.string().required(),
  })
};
const newSocialLinkAdd = {
  body: Joi.object().keys({
    linkedin_link: Joi.string().required(),
    threads_link: Joi.string().required(),
  })
};

module.exports = {
  getCmsId,
  removeCmsImage,
  newcountryOptionAdd,
  newStateOptionAdd,
  newSportsOptionAdd,
  newRaceOptionAdd,
  newEthnicityOptionAdd,
  newIncomeStatusOptionAdd,
  newAthleticsStatusOptionAdd,
  newPartyStatusOptionAdd,
  newContactUsAdd,
  newSocialLinkAdd,
};
