const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const optionsController = require('../controllers/options.controller');
const optionsValidation = require('../validations/options.validation');
const uploadCmsImage = require('../middlewares/uploaders/uploadCmsImage');

const router = express.Router();
router
  .route('/get-state-option/')
  .get(optionsController.getStateOption);

router
  .route('/get-country-option/')
  .get(optionsController.getcountryOption);  

router
  .route('/get-sports-option/')
  .get(optionsController.getSportsOption);

router
  .route('/get-race-option/')
  .get(optionsController.getRaceOption);

router
  .route('/get-ethinicity-option/')
  .get(optionsController.getEthnicityOption);

router
  .route('/get-income-status-option/')
  .get(optionsController.getIncomeStatusOption);

router
  .route('/get-athletics-status-option/')
  .get(optionsController.getAthleticsStatusOption);

router
  .route('/get-party-status-option/')
  .get(optionsController.getPartyStatusOption);



router
  .route('/get-state-option/:id')
  .get(optionsController.getStateOptionById);

router
  .route('/get-country-option/:id')
  .get(optionsController.getcountryOptionById);
  
router
  .route('/get-sports-option/:id')
  .get(optionsController.getSportsOptionById);

router
  .route('/get-race-option/:id')
  .get(optionsController.getRaceOptionById);

router
  .route('/get-ethinicity-option/:id')
  .get(optionsController.getEthnicityOptionById);

router
  .route('/get-income-status-option/:id')
  .get(optionsController.getIncomeStatusOptionById);

router
  .route('/get-athletics-status-option/:id')
  .get(optionsController.getAthleticsStatusOptionById);

router
  .route('/get-party-status-option/:id')
  .get(optionsController.getPartyStatusOptionById);



router
  .route('/add/new-state-option')
  .post(auth('getCms'), validate(optionsValidation.newStateOptionAdd), optionsController.addNewStateOption);
router
  .route('/add/new-country-option')
  .post(auth('getCms'), validate(optionsValidation.newcountryOptionAdd), optionsController.addNewcountryOption);
router
  .route('/add/new-sports-option')
  .post(auth('getCms'), validate(optionsValidation.newSportsOptionAdd), optionsController.addNewSportsOption);

router
  .route('/add/new-race-option')
  .post(auth('getCms'), validate(optionsValidation.newRaceOptionAdd), optionsController.addNewRaceOption);

router
  .route('/add/new-ethinicity-option')
  .post(auth('getCms'), validate(optionsValidation.newEthnicityOptionAdd), optionsController.addNewEthnicityOption);

router
  .route('/add/new-income-status-option')
  .post(auth('getCms'), validate(optionsValidation.newIncomeStatusOptionAdd), optionsController.addNewIncomeStatusOption);

router
  .route('/add/new-athletics-status-option')
  .post(auth('getCms'), validate(optionsValidation.newAthleticsStatusOptionAdd), optionsController.addNewAthleticsStatusOption);

router
  .route('/add/new-party-status-option')
  .post(auth('getCms'), validate(optionsValidation.newPartyStatusOptionAdd), optionsController.addNewPartyStatusOption);



router
  .route('/update/state-option/:id')
  .post(auth('getCms'), optionsController.updateStateOptionById);
router
  .route('/update/country-option/:id')
  .post(auth('getCms'), optionsController.updatecountryOptionById);
router
  .route('/update/sports-option/:id')
  .post(auth('getCms'), optionsController.updateSportsOptionById);

router
  .route('/update/race-option/:id')
  .post(auth('getCms'), optionsController.updateRaceOptionById);

router
  .route('/update/ethinicity-option/:id')
  .post(auth('getCms'), optionsController.updateEthnicityOptionById);

router
  .route('/update/income-status-option/:id')
  .post(auth('getCms'), optionsController.updateIncomeStatusOptionById);

router
  .route('/update/athletics-status-option/:id')
  .post(auth('getCms'), optionsController.updateAthleticsStatusOptionById);

router
  .route('/update/party-status-option/:id')
  .post(auth('getCms'), optionsController.updatePartyStatusOptionById);



router
  .route('/remove/state-option/:id')
  .post(auth('getCms'), optionsController.deleteStateOption);
router
  .route('/remove/country-option/:id')
  .post(auth('getCms'), optionsController.deletecountryOption);
router
  .route('/remove/sports-option/:id')
  .post(auth('getCms'), optionsController.deleteSportsOption);

router
  .route('/remove/race-option/:id')
  .post(auth('getCms'), optionsController.deleteRaceOption);

router
  .route('/remove/ethinicity-option/:id')
  .post(auth('getCms'), optionsController.deleteEthnicityOption);

router
  .route('/remove/income-status-option/:id')
  .post(auth('getCms'), optionsController.deleteIncomeStatusOption);

router
  .route('/remove/athletics-status-option/:id')
  .post(auth('getCms'), optionsController.deleteAthleticsStatusOption);

router
  .route('/remove/party-status-option/:id')
  .post(auth('getCms'), optionsController.deletePartyStatusOption);





module.exports = router;