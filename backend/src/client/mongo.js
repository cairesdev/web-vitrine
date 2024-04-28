"use strict";
const mongoose = require("mongoose");
require("dotenv").config();

const dbURI = process.env.MONGO_URI;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 10000,
  socketTimeoutMS: 45000,
};

mongoose
  .connect(dbURI, options)
  .then(() => {
    console.log("Conectado com sucesso ao banco de dados!");
  })
  .catch((err) => {
    console.log("Erro ao efetuar conexão com o banco de dados:", err.message);
  });

module.exports = mongoose.connection;
