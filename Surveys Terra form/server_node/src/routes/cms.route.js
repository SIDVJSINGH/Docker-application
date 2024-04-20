const express = require('express');
const auth = require('../middlewares/auth');
const validate = require('../middlewares/validate');
const cmsController = require('../controllers/cms.controller');
const cmsValidation = require('../validations/cms.validation');
const uploadCmsImage = require('../middlewares/uploaders/uploadCmsImage');

const router = express.Router();
router
  .route('/')
  .get(cmsController.getContents);

router
  .route('/:id')
  .get(cmsController.getContentsById);

router
  .route('/update/:id')
  .post(auth('getCms'), uploadCmsImage.fields([{ name: "images", maxCount: 1 }]), cmsController.updateContentsById);

router
  .route('/add/new-cms')
  .post(auth('getCms'), validate(cmsValidation.newCmsAdd), cmsController.addNewCms);
router
  .route('/remove/cms-data/:id')
  .post(auth('getCms'), cmsController.deleteCms);

router
  .route('/app/:name')
  .get(cmsController.getContentByName);

router.post('/upload-cms-image/:id', auth(), uploadCmsImage.array('images', Infinity), cmsController.uploadImageByCmsId);
router.post('/remove-cms-image/:id', auth(), validate(cmsValidation.removeCmsImage), cmsController.removeImageByCmsId);


/* --------------  Contact Us -------------------- */
router
  .route('/user/contact-us')
  .post( validate(cmsValidation.newContactUsAdd), cmsController.addNewContactUs);

router
  .route('/get/all-user-contact-us-data')
  .get(cmsController.getAllContactUsData);

/* --------------  social link -------------------- */
router
  .route('/get/all-user-social-link-data')
  .get(cmsController.getAllSocialLinkData);

router
  .route('/add/social-link/:id')
  .post(auth('getCms'), validate(cmsValidation.newSocialLinkAdd), cmsController.addNewSocialLink);

module.exports = router;