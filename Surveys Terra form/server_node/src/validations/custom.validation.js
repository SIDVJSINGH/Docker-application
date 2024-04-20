const objectId = (value, helpers) => {
  if (!value.match(/^[0-9a-fA-F]{24}$/)) {
    return helpers.message('"{{#label}}" must be a valid mongo id');
  }
  return value;
};

const password = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
    return helpers.message('password must contain at least 1 letter and 1 number');
  }
  return value;
};

const confirmPassword = (value, helpers) => {
  if (value.length < 8) {
    return helpers.message('Confirm password must be at least 8 characters');
  }
  if (!value.match(/\d/) || !value.match(/[a-zA-Z]/) || !value.match(/[!@#$%^&*]/)) {
    return helpers.message('Confirm password must contain at least 1 letter and 1 number and 1 special character');
  }
  return value;
};

const first_name = (value, helpers) => {
  const isOnlyLetters = /^[A-Za-z]+$/.test(value);
  if (!isOnlyLetters) {
    return helpers.message('First name is invalid. Only letters are allowed.');
  }
  return value;
};

const last_name = (value, helpers) => {
  const isOnlyLetters = /^[A-Za-z]+$/.test(value);
  if (!isOnlyLetters) {
    return helpers.message('Last name is invalid. Only letters are allowed.');
  }
  return value;
};

const phoneNumber = (value, helpers) => {
  const isOnlyNumbers = /^\d+$/.test(value);
  if (value.length < 10) {
    return helpers.message('Phone number must be at least 10 Numbers.');
  }
  if (!isOnlyNumbers) {
    return helpers.message('Phone number is invalid. Only Numbers are allowed.');
  }
  return value;
};

const userSurveyStatus = (value, helpers) => {
  if (value != "completed" && value != "ongoing" && value != "rejected") {
    return helpers.message('status should be completed|ongoing|rejected.');
  }
  return value;
};

module.exports = {
  objectId,
  password,
  confirmPassword,
  first_name,
  last_name,
  phoneNumber,
  userSurveyStatus,
};
