"use strict";
const { normalize } = require("path");
const debug = require("debug")("nodestr:server");
const app = require("../../app");
const http = require("http");

const PORT = normalize(process.env.PORT || "4000");

app.set("port", PORT);

app.disable("x-powered-by");
app.disable("etag");

const server = http.createServer(app);

server.listen(PORT);

server.on("error", onError);
server.on("listening", onListening);
console.log("Servidor na porta: " + PORT);

function onError(error) {
  if (error.syscall !== "listen") {
    throw error;
  }
  var bind = typeof PORT === "string" ? "Pipe " + PORT : "Port " + PORT;
  switch (error.code) {
    case "EACCES":
      console.error(bind + " necessário privilegios maiores");
      process.exit(1);

    case "EADDRINUSE":
      console.error(bind + " porta em uso!");
      process.exit(1);

    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === "string" ? "pipe " + addr : "port " + addr.port;
  debug("Listening on " + bind);
}
