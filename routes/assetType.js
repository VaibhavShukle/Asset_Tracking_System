const express = require('express');
const sequelize = require('../db');
const AssetType = require('../models/AssetType'); 
const router = express.Router();
const con = require('../sql')

router.post('/add_assetType', async (req, res) => {
  try {
      const data = await AssetType.create({
        asset_types: req.body.asset_types,
      });

      res.send("Asset type added successfully.");
  } catch (error) {
      console.error("Error adding asset:", error);
      res.status(500).send("An error occurred while adding the asset type.");
  }
});


router.get('/getAssetTypes', async (req, res) => {
    const sql = "SELECT * FROM assets_type ";
    const [result]=await sequelize.query(sql)
    return res.json({ Status: "Success", Result: result })
    
})

router.put('/toggleStatus/:id', (req, res) => {
    const id = req.params.id;
    const newStatus = req.body.status;
    const sql = "UPDATE assets_type SET status = ? WHERE assetType_id = ?";
    con.query(sql, [newStatus, id], (err, result) => {
      if (err) {
        return res.json({ Status: "Error updating status" });
      }
      return res.json({ Status: "Success" });
    });
  });


  router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM assets_type WHERE assetType_id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "delete assets error in sql" });
        return res.json({ Status: "Success" })
    })
})
  


module.exports = router;