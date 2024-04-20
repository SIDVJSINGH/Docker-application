const Joi = require("joi");
const {phoneNumber } = require("./custom.validation");


const getCmsId = {
  query: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
const newCmsAdd = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    content: Joi.string().required(),
    title: Joi.string().required(),
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
  newCmsAdd,
  newContactUsAdd,
  newSocialLinkAdd,
};
