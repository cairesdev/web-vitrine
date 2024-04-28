const fs = require("fs");
const existenceCheckService = require("../services/existenceCheckService");
const pathUtils = require("../utils/pathUtils");

class ValidationMiddleware {
  async validationFolder(req, res, next) {
    const { categoria } = req.params;

    if (req.file.filename == undefined)
      return res.status(400).json({
        error: true,
        msg: "O nome do arquivo é obrigatório",
      });

    const fileDirectory = pathUtils.getFileDirectory(categoria);
    const file = pathUtils.getFilePath(categoria, req.file.filename);

    try {
      const resultPath = await existenceCheckService.folder(fileDirectory);

      if (resultPath.error) {
        throw new Error("Pasta inexistente");
      }
      const resultFile = await existenceCheckService.folder(file);

      if (resultFile.error) {
        throw new Error("Arquivo inexistente");
      }
    } catch (error) {
      return res.status(204).json({
        error: true,
        msg: "Server Error",
        fileDirectory: fileDirectory,
      });
    }

    next();
  }
  async validationFolderAndCreated(req, res, next) {
    const { categoria } = req.params;

    const fileDirectory = pathUtils.getFileDirectory(categoria);
    const resultPath = await existenceCheckService.folder(fileDirectory);

    if (resultPath.error) {
      fs.mkdir(fileDirectory, (err) => {
        if (err) {
          return res.status(404).json({
            error: true,
            msg: "A Pasta não existe",
            fileDirectory: fileDirectory,
          });
        }
        console.log("Nova pasta criada.");
        next();
      });
    } else {
      next();
    }
  }
}

module.exports = new ValidationMiddleware();
