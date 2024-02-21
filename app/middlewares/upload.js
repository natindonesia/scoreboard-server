const multer = require("multer");
const maxSize = 2048 * 1000;
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./src/upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
        null,
        file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    if (extension == ".png" || extension == ".jpg" || extension == ".jpeg") {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Unsupported Media Type"));
    }
  },
  limits: { fileSize: maxSize },
});

module.exports = upload;
