const fs = require("fs");
const { promisify } = require("util");
const path = require("path");

const basePath = "lib/";

class DeleteImg {
  async single(file_name, directory) {
    return promisify(fs.unlink)(
      path.resolve(__dirname, "../../../", `${basePath}${directory}`, file_name)
    );
  }
}

module.exports = new DeleteImg();
