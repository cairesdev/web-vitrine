const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BannerSchema = new Schema({
  NOME: { type: String, required: true },
  IMAGEM: { type: String, required: true },
  URL: { type: String, required: true },
  CATEGORIA: { type: String, required: true },
  DATA: { type: Date, default: Date.now },
});

const Banner = mongoose.model("Banner", BannerSchema);

module.exports = Banner;
