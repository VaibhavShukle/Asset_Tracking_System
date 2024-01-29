const express = require("express");
const Asset = require("../models/Asset");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Image = require("../models/Image");
const con = require("../sql");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/add_image/:id", upload.single("imagePath"), async (req, res) => {
  try {
    const { id } = req.params;
    const asset = await Asset.findByPk(id);

    if (!asset) {
      return res
        .status(404)
        .json({ Status: "Error", Message: "Asset not found." });
    }
    await Image.create({
      asset_id: id,
      image_path: req.file ? req.file.path : req.body.imagePath,
    });
    await asset.update({
      image_path: req.file ? req.file.path : req.body.imagePath,
    });

    res.json({ Status: "Success", Message: "Asset image added successfully." });
  } catch (error) {
    console.error("Error adding asset image:", error);
    res.status(500).json({
      Status: "Error",
      Message: "An error occurred while adding the asset image.",
    });
  }
});

router.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  const imagedata = await Image.findAll({ where: { asset_id: id } });
  res.json({
    Status: "Success",
    data: imagedata,
    Message: "Asset image added successfully.",
  });
});

module.exports = router;
