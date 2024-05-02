const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");

const ProductController = require("../controllers/categoria");

router.get("/show_all", ProductController.getAll);

router.post(
  "/create_new/:categoria",
  upload.uploadIcon.single("icon"),
  ProductController.create
);

router.delete("/delete/:id/:image", ProductController.delete);

module.exports = router;
