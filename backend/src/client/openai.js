const { OpenAI } = require("openai");

// Obter a chave da API do OpenAI das variáveis de ambiente
const apiKey = process.env.OPENAI_API_KEY;

const openai = new OpenAI({
  apiKey: apiKey,
  debug: true,
});

module.exports = openai;
