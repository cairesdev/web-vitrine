const path = require("path");

const basePath = "../../lib/";

class PathUtils {
  getFileDirectory(categoria) {
    return path.join(__dirname, `${basePath}${categoria}`);
  }
  getFilePath(categoria, nameFile) {
    return path.join(__dirname, `${basePath}${categoria}/${nameFile}`);
  }
}

module.exports = new PathUtils();
