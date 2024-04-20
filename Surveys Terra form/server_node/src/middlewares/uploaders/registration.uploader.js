// const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     if (file.fieldname === "disability_certificate") {
//       cb(null, "src/uploads/registration-doc/disability-certificate");
//     } else if (file.fieldname === "withhold_tax_certificate") {
//       cb(null, "src/uploads/registration-doc/withhold-tax-certificate");
//     } else if (file.fieldname === "p9_tax_form") {
//       cb(null, "src/uploads/registration-doc/p9-tax-form");
//     }
//   },
//   filename: function (req, file, cb) {
//     if (file.fieldname === "disability_certificate") {
//       const fileName = file.originalname.replace(/\s/g, "_");
//       cb(null, "disability_certificate-" + Date.now() + "-" + fileName);
//     } else if (file.fieldname === "withhold_tax_certificate") {
//       const fileName = file.originalname.replace(/\s/g, "_");
//       cb(null, "withhold_tax_certificate-" + Date.now() + "-" + fileName);
//     } else if (file.fieldname === "p9_tax_form") {
//       const fileName = file.originalname.replace(/\s/g, "_");
//       cb(null, "p9_tax_form-" + Date.now() + "-" + fileName);
//     }
//   },
// });

// const uploadMenuCategoryImage = multer({ storage: storage });

// module.exports = uploadMenuCategoryImage;
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/user-profile-image/');
  },
  filename: function (req, file, cb) {
    /* cb(null, file.fieldname + '-' + Date.now());
    const fileName = file.originalname.replace(/\s/g, "_");
    cb(null, "testImages-" + Date.now() + "-" + fileName); */
    if (file.fieldname === "profile_image") {
      const fileName = file.originalname.replace(/\s/g, "_");
      cb(null, "profile_image-" + Date.now() + "-" + fileName);
    }
  }
});

const registrationUploader = multer({ storage: storage });

module.exports = registrationUploader;