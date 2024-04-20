const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'src/uploads/survey-category-image/');
  },
  filename: function (req, file, cb) {
    if (file.fieldname === "image") {
      const fileName = file.originalname.replace(/\s/g, "_");
      cb(null, "survey_category_image-" + Date.now() + "-" + fileName);
    }
  }
});

const uploadSurveyCategoryImage = multer({ storage: storage });

module.exports = uploadSurveyCategoryImage;