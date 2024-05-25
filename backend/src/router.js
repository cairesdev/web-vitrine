const express = require("express");
const router = express.Router();
const ProductRoutes = require("./routes/produto");
const CategoriasRoutes = require("./routes/categorias");
const BannersRoutes = require("./routes/banners");

router.use("/produto", ProductRoutes);
router.use("/categoria", CategoriasRoutes);
router.use("/banner", BannersRoutes);

module.exports = router;
