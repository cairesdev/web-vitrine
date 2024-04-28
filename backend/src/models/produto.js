const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  NOME: { type: String, required: true },
  DESCRICAO: { type: String, required: true },
  IMAGEM: { type: String, required: true },
  CATEGORIA: { type: String, required: true },
  STATUS: { type: String, required: true },
});

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;
