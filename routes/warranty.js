const express = require("express");
const sequelize = require("../db");
const Warranty = require("../models/Warranty");
const router = express.Router();
const bodyParser = require("body-parser");
const con = require("../sql");
const History = require("../models/History");

router.use(bodyParser.json());

router.post("/add_warranty/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { exp_date, war_length, notes } = req.body;

    const warranty = await Warranty.create({
      asset_id: id,
      exp_date,
      war_length,
      notes,
    });

    await History.create({
      asset_id: id,
      date: new Date(),
      event: "warranty",
      field: "warranty",
      changedFrom: "",
      changedTo: "",
    });

    res.status(201).json({ Status: "Success", Result: warranty });
  } catch (error) {
    console.error("Error adding Warranty:", error);
    res.status(500).json({
      Status: "Error",
      Error: "An error occurred while adding the Warranty.",
    });
  }
});

router.get("/getWarranty/:id", async (req, res) => {
  const assetId = req.params.id;

  try {
    const warranties = await Warranty.findAll({
      where: { asset_id: assetId },
    });

    return res.status(200).json({ Status: "Success", Result: warranties });
  } catch (error) {
    return res
      .status(500)
      .json({ Status: "Error", Message: "Internal Server Error" });
  }
});

router.get("/getWarranty/active", async (req, res) => {
  const sql = "SELECT * FROM warranty WHERE status = 'active'";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

// router.post("/update/:id", async (req, res) => {
//   const id = req.params.id;
//   const sql = "UPDATE warranty SET exp_date=?, notes=? WHERE warranty_id=?";
//   con.query(sql, [req.body.exp_date, req.body.notes, id], (err, result) => {
//     if (err) {
//       return res.json({ Error: "Update warranty error in SQL" });
//     }
//     return res.json({ Status: "Success" });
//   });
// });

router.put("/updateWarranty/:id", async (req, res) => {
  const { id } = req.params; // Extract 'id' from the request parameters

  const { updatedFields, ...updateData } = req.body;

  const existingWarranty = await Warranty.findOne({
    where: {
      warranty_id: id,
    },
  });

  if (!existingWarranty) {
    return res.json({ Status: "False", message: "Warranty not found" });
  }

  const changes = [];

  for (const key in updateData) {
    if (existingWarranty[key] !== updateData[key]) {
      changes.push({
        field: key,
        changedFrom: existingWarranty[key],
        changedTo: updateData[key],
      });
    }
  }

  const result = await Warranty.update(updateData, {
    where: {
      warranty_id: id,
    },
  });

  const assetId = existingWarranty.asset_id;

  for (const change of changes) {
    await History.create({
      asset_id: assetId,
      date: new Date(),
      event: `warranty(update)`,
      field: change.field,
      changedFrom: change.changedFrom,
      changedTo: change.changedTo,
    });
  }

  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "Warranty not found" });
  }
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM warranty WHERE warranty_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete warranty error in sql" });
    return res.json({ Status: "Success" });
  });
});

router.put("/toggleStatus/:id", (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;
  const sql = "UPDATE warranty SET status = ? WHERE warranty_id = ?";
  con.query(sql, [newStatus, id], (err, result) => {
    if (err) {
      return res.json({ Status: "Error updating status" });
    }
    return res.json({ Status: "Success" });
  });
});

router.get("/getWarrantyAsset", async (req, res) => {
  const sql =
    "SELECT w.*,a.asset_name,a.asset_id FROM warranty AS w LEFT JOIN assets AS a ON w.asset_id=a.id";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

module.exports = router;
