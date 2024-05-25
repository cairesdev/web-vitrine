const express = require("express");
const router = express.Router();

const upload = require("../utils/multer");

const ProductController = require("../controllers/produto");

router.get("/show_all", ProductController.getProducts);
router.get("/search", ProductController.getProductsByFilters);

router.get("/show_uinque/:id", ProductController.getProduct);

router.post(
  "/create_new/:categoria",
  upload.uploadImage.array("IMAGEM", 5),
  upload.convertToWebP,
  ProductController.createProduct
);

router.put(
  "/update/:id/:image",
  upload.uploadImage.single("IMAGEM"),
  upload.convertToWebP,
  ProductController.updateProduct
);
router.get("/list_by_categoria/:categoria", ProductController.listByCategoria);

router.delete("/delete/:id", ProductController.deleteProduct);

module.exports = router;
