const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");
const ValidationFile = require("../middleware/validationFile");

const ProductController = require("../controllers/produto");

router.get("/show_all", ProductController.getProducts);

router.get("/show_uinque/:id", ProductController.getProduct);

router.post(
  "/create_new/:categoria",
  ValidationFile.validationFolderAndCreated,
  upload.uploadImage.single("IMAGEM"),
  ProductController.createProduct
);

router.put(
  "/update/:id/:image",
  upload.uploadImage.single("IMAGEM"),
  ProductController.updateProduct
);

router.delete("/delete/:id/:image", ProductController.deleteProduct);

module.exports = router;
