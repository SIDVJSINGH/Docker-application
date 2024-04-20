const httpStatus = require("http-status");
const config = require("../config/config");
const ApiError = require("../utils/ApiError");
const emailService = require("./email.service");
const {
  countryOption,
  StateOption,
  SportsOption,
  RaceOption,
  EthnicityOption,
  IncomeStatusOption,
  AthleticsStatusOption,
  PartyStatusOption, 
} = require('../models/options.model');

const he = require('he');
exports.getcountryOption = _ => countryOption.find({}).sort({name:1}).exec()
exports.getStateOption = _ => StateOption.find({}).sort({name:1}).exec()
exports.getSportsOption = _ => SportsOption.find({}).sort({label:1}).exec()
exports.getRaceOption = _ => RaceOption.find({}).sort({label:1}).exec()
exports.getEthnicityOption = _ => EthnicityOption.find({}).sort({label:1}).exec()
exports.getIncomeStatusOption = _ => IncomeStatusOption.find({}).sort({label:1}).exec()
exports.getAthleticsStatusOption = _ => AthleticsStatusOption.find({}).sort({label:1}).exec()
exports.getPartyStatusOption = _ => PartyStatusOption.find({}).sort({label:1}).exec()

exports.getcountryOptionById = (id) => countryOption.findById(id).exec()
exports.getStateOptionById = (id) => StateOption.findById(id).exec()
exports.getSportsOptionById = (id) => SportsOption.findById(id).exec()
exports.getRaceOptionById = (id) => RaceOption.findById(id).exec()
exports.getEthnicityOptionById = (id) => EthnicityOption.findById(id).exec()
exports.getIncomeStatusOptionById = (id) => IncomeStatusOption.findById(id).exec()
exports.getAthleticsStatusOptionById = (id) => AthleticsStatusOption.findById(id).exec()
exports.getPartyStatusOptionById = (id) => PartyStatusOption.findById(id).exec()


exports.addNewcountryOption = async (element) => {
  const insertObj = {
    name: element.name,
    abbreviation: element.abbreviation,
  }
  return await countryOption.create(insertObj);
};


exports.addNewStateOption = async (element) => {
  const insertObj = {
    name: element.name,
    abbreviation: element.abbreviation,
  }
  return await StateOption.create(insertObj);
};
exports.addNewSportsOption = async (element) => {
  const insertObj = {
    label: element.label,
    value: element.value,
  }
  return await SportsOption.create(insertObj);
};
exports.addNewRaceOption = async (element) => {
  const insertObj = {
    label: element.label,
    value: element.value,
  }
  return await RaceOption.create(insertObj);
};
exports.addNewEthnicityOption = async (element) => {
  const insertObj = {
    label: element.label,
    value: element.value,
  }
  return await EthnicityOption.create(insertObj);
};
exports.addNewIncomeStatusOption = async (element) => {
  const insertObj = {
    label: element.label,
    value: element.value,
  }
  return await IncomeStatusOption.create(insertObj);
};
exports.addNewAthleticsStatusOption = async (element) => {
  const insertObj = {
    label: element.label,
    value: element.value,
  }
  return await AthleticsStatusOption.create(insertObj);
};
exports.addNewPartyStatusOption = async (element) => {
  const insertObj = {
    label: element.label,
    value: element.value,
  }
  return await PartyStatusOption.create(insertObj);
};

exports.updatecountryOptionById = async (link_id, element) => {
  try {
    const linkIdExists = await countryOption.findOne({ _id: link_id })
    if (!linkIdExists) {
      throw new ApiError(httpStatus.NOT_FOUND, `Please provide a valid id!`);
    }
    var obj = {};
    if (element.name) {
      obj.name = element.name
    }
    if (element.abbreviation) {
      obj.abbreviation = element.abbreviation
    }
    await countryOption.findByIdAndUpdate(link_id, obj, { new: true });
    return await countryOption.findById(link_id)
  } catch (error) {
    // console.log("errorr------>>>>    ", error)
    throw error;
  }
};

exports.updateStateOptionById = async (link_id, element) => {
  try {
    const linkIdExists = await StateOption.findOne({ _id: link_id })
    if (!linkIdExists) {
      throw new ApiError(httpStatus.NOT_FOUND, `Please provide a valid id!`);
    }
    var obj = {};
    if (element.name) {
      obj.name = element.name
    }
    if (element.abbreviation) {
      obj.abbreviation = element.abbreviation
    }
    await StateOption.findByIdAndUpdate(link_id, obj, { new: true });
    return await StateOption.findById(link_id)
  } catch (error) {
    // console.log("errorr------>>>>    ", error)
    throw error;
  }
};

exports.updateSportsOptionById = async (link_id, element) => {
  try {
    const linkIdExists = await SportsOption.findOne({ _id: link_id })
    if (!linkIdExists) {
      throw new ApiError(httpStatus.NOT_FOUND, `Please provide a valid id!`);
    }
    var obj = {};
    if (element.label) {
      obj.label = element.label
    }
    if (element.value) {
      obj.value = element.value
    }
    await SportsOption.findByIdAndUpdate(link_id, obj, { new: true });
    return await SportsOption.findById(link_id)
  } catch (error) {
    // console.log("errorr------>>>>    ", error)
    throw error;
  }
};

exports.updateRaceOptionById = async (link_id, element) => {
  try {
    const linkIdExists = await RaceOption.findOne({ _id: link_id })
    if (!linkIdExists) {
      throw new ApiError(httpStatus.NOT_FOUND, `Please provide a valid id!`);
    }
    var obj = {};
    if (element.label) {
      obj.label = element.label
    }
    if (element.value) {
      obj.value = element.value
    }
    await RaceOption.findByIdAndUpdate(link_id, obj, { new: true });
    return await RaceOption.findById(link_id)
  } catch (error) {
    // console.log("errorr------>>>>    ", error)
    throw error;
  }
};
exports.updateEthnicityOptionById = async (link_id, element) => {
  try {
    const linkIdExists = await EthnicityOption.findOne({ _id: link_id })
    if (!linkIdExists) {
      throw new ApiError(httpStatus.NOT_FOUND, `Please provide a valid id!`);
    }
    var obj = {};
    if (element.label) {
      obj.label = element.label
    }
    if (element.value) {
      obj.value = element.value
    }
    await EthnicityOption.findByIdAndUpdate(link_id, obj, { new: true });
    return await EthnicityOption.findById(link_id)
  } catch (error) {
    // console.log("errorr------>>>>    ", error)
    throw error;
  }
};
exports.updateIncomeStatusOptionById = async (link_id, element) => {
  try {
    const linkIdExists = await IncomeStatusOption.findOne({ _id: link_id })
    if (!linkIdExists) {
      throw new ApiError(httpStatus.NOT_FOUND, `Please provide a valid id!`);
    }
    var obj = {};
    if (element.label) {
      obj.label = element.label
    }
    if (element.value) {
      obj.value = element.value
    }
    await IncomeStatusOption.findByIdAndUpdate(link_id, obj, { new: true });
    return await IncomeStatusOption.findById(link_id)
  } catch (error) {
    // console.log("errorr------>>>>    ", error)
    throw error;
  }
};
exports.updateAthleticsStatusOptionById = async (link_id, element) => {
  try {
    const linkIdExists = await AthleticsStatusOption.findOne({ _id: link_id })
    if (!linkIdExists) {
      throw new ApiError(httpStatus.NOT_FOUND, `Please provide a valid id!`);
    }
    var obj = {};
    if (element.label) {
      obj.label = element.label
    }
    if (element.value) {
      obj.value = element.value
    }
    await AthleticsStatusOption.findByIdAndUpdate(link_id, obj, { new: true });
    return await AthleticsStatusOption.findById(link_id)
  } catch (error) {
    // console.log("errorr------>>>>    ", error)
    throw error;
  }
};
exports.updatePartyStatusOptionById = async (link_id, element) => {
  try {
    const linkIdExists = await PartyStatusOption.findOne({ _id: link_id })
    if (!linkIdExists) {
      throw new ApiError(httpStatus.NOT_FOUND, `Please provide a valid id!`);
    }
    var obj = {};
    if (element.label) {
      obj.label = element.label
    }
    if (element.value) {
      obj.value = element.value
    }
    await PartyStatusOption.findByIdAndUpdate(link_id, obj, { new: true });
    return await PartyStatusOption.findById(link_id)
  } catch (error) {
    // console.log("errorr------>>>>    ", error)
    throw error;
  }
};

exports.deletecountryOption = (id) => {
  return countryOption.deleteOne({ _id: id }).exec();
};

exports.deleteStateOption = (id) => {
  return StateOption.deleteOne({ _id: id }).exec();
};

exports.deleteSportsOption = (id) => {
  return SportsOption.deleteOne({ _id: id }).exec();
};

exports.deleteRaceOption = (id) => {
  return RaceOption.deleteOne({ _id: id }).exec();
};

exports.deleteEthnicityOption = (id) => {
  return EthnicityOption.deleteOne({ _id: id }).exec();
};

exports.deleteIncomeStatusOption = (id) => {
  return IncomeStatusOption.deleteOne({ _id: id }).exec();
};

exports.deleteAthleticsStatusOption = (id) => {
  return AthleticsStatusOption.deleteOne({ _id: id }).exec();
};

exports.deletePartyStatusOption = (id) => {
  return PartyStatusOption.deleteOne({ _id: id }).exec();
};

