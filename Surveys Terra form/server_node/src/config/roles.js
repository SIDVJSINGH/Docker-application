const allRoles = {
  user: ['updateUserDetails', 'changePassword', 'getUserDetails', 'getUserAllActiveSurveyListsByAgeRange', 'getUserAllRewardLists', 'addUserSurveyParticipation', 'getRewardCategoryById', 'removeAccount'],
  admin: ['getUsers', 'manageUsers', 'getUserDetails', 'updateUserDetails', 'addSurveyCategory', 'updateSurveyCategory', 'deleteSurveyCategory', 'changePassword', 'getCms', 'getTotalRegisteredUsers', 'getTotalSurveyCreated', 'getTotalSurveyCompleted', 'addSurveyType', 'updateSurveyType', 'deleteSurveyType', 'addSurveyTag', 'updateSurveyTag', 'deleteSurveyTag', 'getUserAllParticipationListsBySurveyId', 'updateRewardCategory', 'getRewardCategoryById', 'removeAccount', 'addAdminUser', 'getAllAdminLists'],
};

const roles = Object.keys(allRoles);
const roleRights = new Map(Object.entries(allRoles));

module.exports = {
  roles,
  roleRights,
};
