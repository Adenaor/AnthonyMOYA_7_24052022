const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images/users");
  },
  filename: (req, file, callback) => {
    const name = req.body.pseudo;
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + "." + extension);
  },
});

const upload = multer({ storage: storage });

module.exports = upload.single("name");
