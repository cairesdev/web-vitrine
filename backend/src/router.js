const express = require("express");
const router = express.Router();
const ProductRoutes = require("./routes/produto");
const CategoriasRoutes = require("./routes/categorias");

router.use("/produto", ProductRoutes);
router.use("/categoria", CategoriasRoutes);

module.exports = router;
