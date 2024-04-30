const Product = require("../models/produto");
const deleteImage = require("../utils/deleteImage");

class ProductController {
  static async getProducts(req, res) {
    try {
      const products = await Product.find();

      // await new Promise((resolve) => setTimeout(resolve, 3000));

      res.status(200).json({
        message: "Produtos listados com sucesso",
        quantidade: products.length,
        results: products,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
  static async createProduct(req, res) {
    const data = req.body;

    try {
      const existingProduct = await Product.findOne({ NOME: data.NOME });
      if (existingProduct) {
        return res.status(400).json({ error: "Produto com nome duplicado" });
      }

      const product_data = {
        NOME: data.NOME,
        DESCRICAO: data.DESCRICAO,
        PRECO: data.PRECO,
        CATEGORIA: data.CATEGORIA,
        IMAGEM: req.file.filename,
        QUANTIDADE: data.QUANTIDADE,
        STATUS: data.STATUS,
      };

      const product = new Product(product_data);
      const savedProduct = await product.save();

      return res.status(201).json({
        message: "Produto criado com sucesso",
        result: savedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
  static async getProduct(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      res.status(200).json({
        message: "Produto encontrado com sucesso",
        result: product,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
  static async deleteProduct(req, res) {
    const { id, image } = req.params;
    try {
      const product = await Product.findByIdAndDelete(id);
      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      deleteImage.single(image, "produtos");
      res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
  static async updateProduct(req, res) {
    const { id, image } = req.params;
    const data = req.body;

    try {
      if (req.file == undefined) {
        data.IMAGEM = req.params.image;
      } else {
        data.IMAGEM = req.file.filename;
        deleteImage.single(image, "produtos");
      }

      const product = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      res.status(200).json(product);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = ProductController;
