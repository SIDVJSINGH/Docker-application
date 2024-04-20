const httpStatus = require("http-status");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const emailService = require("./email.service");
var { CmsPage, Contact, SocialLink } = require('../models/cms.model');
const he = require('he');
exports.getContents = _ => CmsPage.find({}).select('name content title images updated_at description email').exec()
exports.getContent = (id) => CmsPage.findById(id).select('name content title images description email').exec()
exports.getContentByName = (name) => {
  if (name == "contact-us") {
    return CmsPage.findOne({ name }).select('name title description email updated_at').exec()
  } else {
    return CmsPage.findOne({ name }).select('name title content images updated_at').exec()
  }
}
exports.addCMSImage = (content_id, image) => CmsPage.findByIdAndUpdate(content_id, { '$addToSet': { images: image } }).exec()
// exports.updateContent = (content_id, text) => CmsPage.model.findByIdAndUpdate(content_id, { content: text }, { new: true }).exec();
exports.updateContent = async (content_id, element, imagePath) => {
  try {
    const contentIdExists = await CmsPage.findOne({ _id: content_id })
    if (!contentIdExists) {
      throw new ApiError(
        httpStatus.NOT_FOUND,
        `Please provide a valid id!`
      );
    }
    // const contentDecodedText = he.decode(element.content);
    // const contentDecodedDescText = he.decode(element.description);
    const images = imagePath.images ? imagePath.images.length > 0 ? config.base_url + "/uploads/cms-images/" + imagePath.images[0].filename : "" : "";
    if (contentIdExists.name == "contact-us") {
      // console.log("cms with contact-us")
      return await CmsPage.findByIdAndUpdate(content_id, { description: element.description ? he.decode(element.description) : contentIdExists.description, title: element.title ? element.title : contentIdExists.title, email: element.email ? element.email : contentIdExists.email, images: images ? images : contentIdExists.images }, { new: true });
    } else {
      // console.log("cms without contact-us")
      return await CmsPage.findByIdAndUpdate(content_id, { content: element.content ? he.decode(element.content) : contentIdExists.content, title: element.title ? element.title : contentIdExists.title, images: images ? images : contentIdExists.images }, { new: true });
    }
  } catch (error) {
    // console.log("errorr------>>>>    ", error)
    throw error;
  }
};
exports.addNewCms = async (element) => {
  const insertObj = {
    name: element.name,
    title: element.title,
    content: he.decode(element.content),
  }
  return await CmsPage.create(insertObj);
};
exports.removeCMSImage = (content_id, image) => CmsPage.findByIdAndUpdate(content_id, { '$pull': { images: image } }).exec();
exports.deleteCms = (id) => {
  return CmsPage.deleteOne({ _id: id }).exec();
};
exports.addNewContactUs = async (element) => {
  // const sameEmailCheck = await Contact.findOne({ email: element.email, isDelete: false })
  // const samePhoneCheck = await Contact.findOne({ phone_number: element.phone_number, isDelete: false })
  // if (sameEmailCheck) {
  //   throw new ApiError(
  //     httpStatus.NOT_FOUND,
  //     `Please provide another email, this ${element.email} email already exist!`
  //   );
  // }
  // if (samePhoneCheck) {
  //   throw new ApiError(
  //     httpStatus.NOT_FOUND,
  //     `Please provide another phone number, this ${element.phone_number} phone number already exist!`
  //   );
  // }
  const insertObj = {
    name: element.name,
    email: element.email,
    message: element.message,
  }
  const newContact = await Contact.create(insertObj);
  await emailService.sendContactDataToAdmin(
    config.survey_smtp_email,
    newContact.name,
    newContact.email,
    newContact.message
  );
  await emailService.sendContactDataToUser(
    newContact.email,
    newContact.name
  );
  return newContact;
};
exports.getContactUsAllUserData = (_) => Contact.find({ isDelete: false }).lean().exec()
exports.getSocialLinkAllUserData = (_) => SocialLink.find({ isDelete: false }).lean().exec()
exports.updateNewSocialLink = async (link_id, element) => {
  try {
    const linkIdExists = await SocialLink.findOne({ _id: link_id })
    if (!linkIdExists) {
      throw new ApiError(httpStatus.NOT_FOUND, `Please provide a valid id!`);
    }
    var obj = {};
    if (element.linkedin_link) {
      obj.linkedin_link = element.linkedin_link
    }
    if (element.threads_link) {
      obj.threads_link = element.threads_link
    }
    await SocialLink.findByIdAndUpdate(link_id, obj, { new: true });
    return await SocialLink.findById(link_id)
  } catch (error) {
    // console.log("errorr------>>>>    ", error)
    throw error;
  }
};