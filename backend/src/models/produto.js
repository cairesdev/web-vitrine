const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: { type: String, required: true },
  altText: { type: String, required: false },
});

const SeoSchema = new Schema({
  title: { type: String, required: false },
  description: { type: String, required: false },
  keywords: { type: [String], required: false },
});

const ProductSchema = new Schema({
  NOME: { type: String, required: true },
  DESCRICAO: { type: String, required: true },
  CATEGORIA: { type: String, required: true },
  STATUS: { type: String, required: true },
  PRECO: { type: String, required: false },
  tags: { type: [String], required: false },
  IMAGENS: { type: [ImageSchema], required: false },
  SEO: { type: SeoSchema, required: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
