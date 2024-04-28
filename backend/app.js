const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
// const rateLimit = require("express-rate-limit");
const database = require("./src/client/mongo");
const path = require("path");
require("dotenv").config();

const routes = require("./src/router");

const app = express();

app.disable("x-powered-by");

app.use(
  bodyParser.json({ limit: "200mb", extended: true, parameterLimit: 50000 })
);
app.use(
  cors({
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    origin: "*",
    allowedHeaders: "*",
    maxAge: 86400,
  })
);
app.use(express.static(path.join(__dirname, "public")));

app.use("/produtos", express.static(path.join(__dirname, "../lib/produtos")));
app.use(
  "/categorias",
  express.static(path.join(__dirname, "../lib/categorias"))
);
app.use(helmet());

app.get("/", (req, res) => res.status(200).json("ok"));
app.use(routes);

module.exports = app;

//mover para rotas de login apenas
// app.use(
//   rateLimit({
//     message: "Você excedeu o limite de requisições por hora.",
//     windowMs: 1000 * 60 * 60,
//     max: 30,
//   })
// );
