const multer = require('multer');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // console.log("abcd");
    cb(null, 'src/uploads/cms-images/');
  },
  filename: function (req, file, cb) {
    // cb(null, file.fieldname + '-' + Date.now());
    // const fileName = file.originalname.replace(/\s/g, "_");
    //   cb(null, "testImages-" + Date.now() + "-" + fileName);
    if (file.fieldname === "images") {
        const fileName = file.originalname.replace(/\s/g, "_");
      cb(null, "cms-" + Date.now() + "-" + fileName);
    }
  }
});

const uploadPic = multer({ storage: storage });

module.exports = uploadPic;