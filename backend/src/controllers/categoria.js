const Categoria = require("../models/categorias");
const deleteImage = require("../utils/deleteImage");

class CategoryController {
  static async create(req, res) {
    const data = req.body;
    try {
      data.IMAGEM = req.file.filename;
      const categoria = await Categoria.create(data);
      return res.json(categoria);
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async getAll(req, res) {
    try {
      const categoria = await Categoria.find();
      return res.json({
        messages: "Categorias capturados com sucesso",
        results: categoria,
      });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }

  static async delete(req, res) {
    const { id, image } = req.params;
    try {
      await Categoria.findByIdAndDelete(id);
      deleteImage.single(image, "categoria");
      return res.json({ message: "Produto deletado com sucesso" });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  }
}

module.exports = CategoryController;
