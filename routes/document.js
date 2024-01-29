const express = require("express");
const Asset = require("../models/Asset");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const Document = require("../models/Document");
const con = require("../sql");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/document");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.originalname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post(
  "/add_document/:id",
  upload.single("document"),
  async (req, res) => {
    try {
      const { id } = req.params;
      const asset = await Asset.findByPk(id);

      if (!asset) {
        return res
          .status(404)
          .json({ Status: "Error", Message: "Asset not found." });
      }
      await Document.create({
        asset_id: id,
        doc_title: req.body.doc_title,
        document: req.file ? req.file.originalname : null,
      });
      await asset.update({ document: req.file ? req.file.originalname : null });

      res.json({
        Status: "Success",
        Message: "Asset Document added successfully.",
      });
    } catch (error) {
      console.error("Error adding asset document:", error);
      res.status(500).json({
        Status: "Error",
        Message: "An error occurred while adding the asset document.",
      });
    }
  }
);

router.get("/get/:id", async (req, res) => {
  const id = req.params.id;
  const Documentdata = await Document.findAll({ where: { asset_id: id } });
  res.json({
    Status: "Success",
    data: Documentdata,
    Message: "Asset Document added successfully.",
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM document WHERE doc_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete document error in sql" });
    return res.json({ Status: "Success" });
  });
});

module.exports = router;
