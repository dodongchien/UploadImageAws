const multer = require("multer");

const multerConfig = {
  limits: 1024 * 1024,
  fileFilter: function (req, file, done) {
    if (
      file.mimetype === "image/jpg" ||
      file.mimetype === "image/png" ||
      file.mimetype === "image/jpeg"
    ) {
      done(null, true);
    } else {
      done("Niewłaściwy plik, użyj .jpg .jpeg .png", false);
    }
  },
};
const upload = multer(multerConfig);

module.exports = upload;
