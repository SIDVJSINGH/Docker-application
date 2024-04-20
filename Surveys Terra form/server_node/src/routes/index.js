const express = require('express');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const cmsRoute = require('./cms.route');
const optionRoute = require('./options.route');
const surveyCategoryManagement = require('./survey.management.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path:'/cms',
    route: cmsRoute
  },  
  {
    path:'/options',
    route: optionRoute
  },
  {
    path:'/survey-category-management',
    route: surveyCategoryManagement
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});


module.exports = router;
