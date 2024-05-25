const Banners = require("../models/banners");
const deleteImage = require("../utils/deleteImage");
const __revalidate = require("../services/_revalidateService");

class BannersControllers {
  static async create(req, res) {
    try {
      const { NOME, CATEGORIA, URL } = req.body;

      if (!req.file) {
        return res.status(400).json({ message: "Imagem não enviada" });
      }

      const banner = await Banners.create({
        NOME,
        URL,
        IMAGEM: req.file.filename,
        CATEGORIA,
      });

      __revalidate("banners");

      return res.status(201).json(banner);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async list(req, res) {
    try {
      const banners = await Banners.find();
      const total = await Banners.countDocuments();
      return res.status(200).json({
        result: banners,
        total: total,
        message: "Banners listados",
      });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }

  static async delete(req, res) {
    try {
      const { id, image } = req.params;
      await deleteImage.single(image, "banners");
      await Banners.findByIdAndDelete(id);
      __revalidate("banners");
      return res.status(200).json({ message: "Banner deletado" });
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = BannersControllers;
