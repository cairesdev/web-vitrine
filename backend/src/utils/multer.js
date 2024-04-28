const multer = require("multer");
const { v4: uuid } = require("uuid");

const basePath = "../lib/";

const local = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${basePath}produtos`);
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname
      .split("")
      .reverse()
      .join("")
      .split(".")[0]
      .split("")
      .reverse()
      .join("");
    const fileName = `${uuid()}.${fileExtension}`;
    cb(null, fileName);
  },
});

const icons = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${basePath}categoria`);
  },
  filename: function (req, file, cb) {
    const fileExtension = file.originalname
      .split("")
      .reverse()
      .join("")
      .split(".")[0]
      .split("")
      .reverse()
      .join("");
    const fileName = `${uuid()}.${fileExtension}`;
    cb(null, fileName);
  },
});

const uploadImage = multer({
  storage: local,
  limits: { fieldSize: 20 * 1024 * 1024 },
});

const uploadIcon = multer({
  storage: icons,
  limits: { fieldSize: 20 * 1024 * 1024 },
});

module.exports = {
  uploadImage,
  uploadIcon,
};
