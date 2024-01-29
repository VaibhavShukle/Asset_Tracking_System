const express = require('express');
const sequelize = require('../db');
const AssetModel = require('../models/AssetModel'); 
const router = express.Router();
const con = require('../sql')

router.post('/add_assetModel', async (req, res) => {
  try {
      const data = await AssetModel.create({
        model_name: req.body.model_name,
        model_assetType: req.body.model_assetType,
      });

      res.send("Asset Model added successfully.");
  } catch (error) {
      console.error("Error adding asset model:", error);
      res.status(500).send("An error occurred while adding the asset model.");
  }
});


router.get('/getAssetModel', async (req, res) => {
    const sql = "SELECT * FROM model ";
    const [result]=await sequelize.query(sql)
    return res.json({ Status: "Success", Result: result })
    
})

router.put('/toggleStatus/:id', (req, res) => {
    const id = req.params.id;
    const newStatus = req.body.status;
    const sql = "UPDATE model SET status = ? WHERE model_id = ?";
    con.query(sql, [newStatus, id], (err, result) => {
      if (err) {
        return res.json({ Status: "Error updating status" });
      }
      return res.json({ Status: "Success" });
    });
  });


  router.delete('/delete/:id', (req, res) => {
    const id = req.params.id;
    const sql = "DELETE FROM model WHERE model_id = ?";
    con.query(sql, [id], (err, result) => {
        if (err) return res.json({ Error: "delete asset model error in sql" });
        return res.json({ Status: "Success" })
    })
})
  


module.exports = router;