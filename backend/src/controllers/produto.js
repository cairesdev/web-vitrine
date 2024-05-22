const Product = require("../models/produto");
const deleteImage = require("../utils/deleteImage");
const OpenAI = require("../client/openai");

class ProductController {
  static async getProducts(req, res) {
    const { page = 1, limit = 10 } = req.query;
    try {
      const skip = (page - 1) * limit;

      const products = await Product.find().skip(skip).limit(parseInt(limit));

      const totalProducts = await Product.countDocuments();

      return res.status(200).json({
        message: "Produtos listados com sucesso",
        quantidade: products.length,
        total: totalProducts,
        result: products,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: error.message,
        message: "Erro ao listar produtos",
      });
    }
  }

  static async createProduct(req, res) {
    const data = req.body;

    try {
      const existingProduct = await Product.findOne({ NOME: data.NOME });
      if (existingProduct) {
        return res.status(400).json({ error: "Produto com nome duplicado" });
      }

      const prompt = `Crie um array com dados otimizados, e pensados para SEO e indexação de produtos no google, com base no nome do produto que é: ${data.NOME}, sua categoria: ${data.CATEGORIA}. Nesse array quero uma descrição melhorada pois a escrita foi: ${data.DESCRICAO}, com tags para o keywords e SEO, uma curta descricao para metadata. Mantenha a estrutura de array seguinte:
      {
        "description": "string",
        "keywords": string[],
        "title": "string"
      }
      `;
      const response = await OpenAI.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 1423,
      });

      let arrayTags = JSON.parse(response.choices[0].message.content);

      const product_data = {
        NOME: data.NOME,
        DESCRICAO: arrayTags.description,
        PRECO: data.PRECO,
        CATEGORIA: data.CATEGORIA,
        STATUS: data.STATUS,
        tags: data.tags,
        IMAGENS: req.files.map((file) => ({
          url: file.filename,
          altText: data.altText || "Produto",
        })),
        SEO: arrayTags,
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
      // Encontra o produto pelo ID
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      // Busca produtos similares por categoria ou tags, excluindo o produto atual
      const similarProducts = await Product.find({
        $or: [
          { CATEGORIA: product.CATEGORIA },
          { tags: { $in: product.tags } },
        ],
        _id: { $ne: id }, // Exclui o produto atual da busca
      })
        .select("NOME PRECO CATEGORIA IMAGENS PRECO")
        .limit(10); // Limita a 10 produtos similares

      return res.status(200).json({
        message: "Produto encontrado com sucesso",
        result: product,
        quantidade: similarProducts.length,
        similares: similarProducts,
      });
    } catch (error) {
      console.error(error);
      return res.status(500).json({
        error: error.message,
        message: "Erro ao buscar o produto",
      });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;

    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      if (product.IMAGENS && product.IMAGENS.length > 0) {
        product.IMAGENS.forEach((image) => {
          deleteImage.single(image.url, "produtos");
        });
      }

      await Product.findByIdAndDelete(id);

      res.status(200).json({ message: "Produto deletado com sucesso" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
      const product = await Product.findById(id);
      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      // Atualização dos campos do produto
      product.NOME = data.NOME || product.NOME;
      product.DESCRICAO = data.DESCRICAO || product.DESCRICAO;
      product.CATEGORIA = data.CATEGORIA || product.CATEGORIA;
      product.STATUS = data.STATUS || product.STATUS;
      product.VALOR = data.VALOR || product.VALOR;
      product.tags = data.tags || product.tags;

      // Atualização das imagens
      if (req.file) {
        // Remover imagem antiga se uma nova foi enviada
        if (product.IMAGENS && product.IMAGENS.length > 0) {
          // Ajustar se múltiplas imagens forem suportadas
          deleteImage.single(product.IMAGENS[0].url, "produtos");
        }
        product.IMAGENS = [
          {
            url: req.file.filename,
            altText: data.altText || "",
          },
        ];
      } else if (data.existingImages) {
        // Usar as imagens existentes se fornecidas
        product.IMAGENS = data.existingImages;
      }

      const updatedProduct = await product.save();

      res.status(200).json({
        message: "Produto atualizado com sucesso",
        result: updatedProduct,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  }

  static async listByCategoria(req, res) {
    const { categoria } = req.params;
    const { page = 1, limit = 10 } = req.query;

    try {
      const skip = (page - 1) * limit;

      // Busca produtos pela categoria com paginação
      const products = await Product.find({ CATEGORIA: categoria })
        .skip(skip)
        .limit(parseInt(limit));

      // Conta o número total de produtos na categoria para paginação
      const totalProducts = await Product.countDocuments({
        CATEGORIA: categoria,
      });

      res.status(200).json({
        message: "Produtos listados com sucesso",
        quantidade: products.length,
        total: totalProducts,
        results: products,
        currentPage: page,
        totalPages: Math.ceil(totalProducts / limit),
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        error: error.message,
        message: "Erro ao listar produtos por categoria",
      });
    }
  }
}

module.exports = ProductController;
