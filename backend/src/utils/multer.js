const multer = require("multer");
const { v4: uuid } = require("uuid");
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const basePath = "./lib/";

const local = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${basePath}produtos`);
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuid()}${fileExtension}`;
    cb(null, fileName);
  },
});

const banners = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${basePath}banners`);
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuid()}${fileExtension}`;
    cb(null, fileName);
  },
});

const icons = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${basePath}categoria`);
  },
  filename: function (req, file, cb) {
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuid()}${fileExtension}`;
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

const uploadBanner = multer({
  storage: banners,
  limits: { fieldSize: 20 * 1024 * 1024 },
});

const convertToWebP = async (req, res, next) => {
  if (!req.files || req.files.length === 0) return next();

  try {
    await Promise.all(
      req.files.map(async (file) => {
        const originalFilePath = file.path;
        const fileNameWithoutExt = path.parse(file.filename).name;
        const newFilePath = path.join(
          path.dirname(originalFilePath),
          `${fileNameWithoutExt}.webp`
        );

        await sharp(originalFilePath).webp({ quality: 80 }).toFile(newFilePath);

        const originalsDir = path.join(
          path.dirname(originalFilePath),
          "originals"
        );
        if (!fs.existsSync(originalsDir)) {
          fs.mkdirSync(originalsDir);
        }

        const originalFileNewPath = path.join(
          originalsDir,
          path.basename(originalFilePath)
        );

        // Move the original file to the 'originals' directory
        await fs.promises.rename(originalFilePath, originalFileNewPath);

        // Update the file info in the request object
        file.filename = `${fileNameWithoutExt}.webp`;
        file.path = newFilePath;
      })
    );

    next();
  } catch (err) {
    console.error("Error processing images:", err);
    next(err);
  }
};

const convertUniqueToWebp = async (req, res, next) => {
  if (!req.file) return next();

  try {
    const originalFilePath = req.file.path;
    const fileNameWithoutExt = path.parse(req.file.filename).name;
    const newFilePath = path.join(
      path.dirname(originalFilePath),
      `${fileNameWithoutExt}.webp`
    );

    await sharp(originalFilePath).webp({ quality: 80 }).toFile(newFilePath);

    req.file.filename = `${fileNameWithoutExt}.webp`;
    req.file.path = newFilePath;

    next();
  } catch (err) {
    console.error("Error processing image:", err);
    next(err);
  }
};

module.exports = {
  uploadImage,
  uploadIcon,
  uploadBanner,
  convertToWebP,
  convertUniqueToWebp,
};
