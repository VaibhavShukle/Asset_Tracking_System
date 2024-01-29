const express = require("express");
const sequelize = require("../db");
const AssetBrand = require("../models/AssetBrand");
const router = express.Router();
const con = require("../sql");

router.post("/add_assetBrand", async (req, res) => {
  try {
    const data = await AssetBrand.create({
      brand_name: req.body.brand_name,
    });

    res.send("Asset Brand added successfully.");
  } catch (error) {
    console.error("Error adding asset brand:", error);
    res.status(500).send("An error occurred while adding the asset brand.");
  }
});

router.get("/getassetBrand", async (req, res) => {
  const sql = "SELECT * FROM brand ";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

router.get("/getAssetBrand/:id", async (req, res) => {
  const result = await AssetBrand.findOne({
    where: { brand_id: req.params.id },
  });
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "Asset brand not found" });
  }
});

router.put("/updateAssetBrand/:id", async (req, res) => {
  const result = await AssetBrand.update(
    { brand_name: req.body.brand_name },
    {
      where: {
        brand_id: req.params.id,
      },
    }
  );
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "Asset brand not found" });
  }
});

router.get("/getassetBrand/active", async (req, res) => {
  const sql = "SELECT * FROM brand WHERE status = 1";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

router.put("/toggleStatus/:id", (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;
  const sql = "UPDATE brand SET status = ? WHERE brand_id = ?";
  con.query(sql, [newStatus, id], (err, result) => {
    if (err) {
      return res.json({ Status: "Error updating status" });
    }
    return res.json({ Status: "Success" });
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM brand WHERE brand_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete asset brand error in sql" });
    return res.json({ Status: "Success" });
  });
});

module.exports = router;
