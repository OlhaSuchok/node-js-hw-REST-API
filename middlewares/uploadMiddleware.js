const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
// const fs = require("fs/promises");

const FILE_DIR = path.resolve("./tmp");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, FILE_DIR);
  },
  filename: (req, file, cb) => {
    const [, extention] = file.originalname.split(".");
    cb(null, `${uuidv4()}.${extention}`);
  },
});

const uploadMiddleware = multer({ storage });

module.exports = {
  uploadMiddleware,
};
