const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/png": "png",
  "image/jpeg": "jpeg",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/user");
  },
  filename: (req, file, callback) => {
    const name = req.body.name;
    callback(null, name + Date.now() + ".jpg");
  },
});

module.exports = multer({ storage: storage }).single("image");
