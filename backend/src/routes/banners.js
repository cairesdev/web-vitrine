const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");

const BannersControllers = require("../controllers/banners");

router.get("/show_all", BannersControllers.list);

router.post(
  "/create_new",
  upload.uploadBanner.single("banner"),
  upload.convertUniqueToWebp,
  BannersControllers.create
);

router.delete("/delete/:id/:image", BannersControllers.delete);

module.exports = router;
