const Product = require("../models/categorias");
const deleteImage = require("../utils/deleteImage");

class CategoryController {
  static async create(req, res) {
    const data = req.body;
    try {
      data.IMAGEM = req.file.filename;
      const product = await Product.create(data);
      return res.json(product);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const products = await Product.find();
      return res.json({
        messages: "Categorias capturados com sucesso",
        results: products,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    const { id, image } = req.params;
    try {
      await Product.findByIdAndDelete(id);
      deleteImage.single(image, "categoria");
      return res.json({ message: "Produto deletado com sucesso" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = CategoryController;
