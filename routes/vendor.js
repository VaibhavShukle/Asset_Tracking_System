const express = require("express");
const sequelize = require("../db");
const Vendor = require("../models/Vendor");
const router = express.Router();
const con = require("../sql");

router.post("/add_vendor", async (req, res) => {
  try {
    const data = await Vendor.create({
      v_name: req.body.v_name,
      v_phone: req.body.v_phone,
      v_address: req.body.v_address,
      v_details: req.body.v_details,
    });

    res.send("Vendor added successfully.");
  } catch (error) {
    console.error("Error adding vendor:", error);
    res.status(500).send("An error occurred while adding the vendor.");
  }
});

router.get("/getvendor", async (req, res) => {
  const sql = "SELECT * FROM vendor";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

router.get("/getVendor/:id", async (req, res) => {
  const result = await Vendor.findOne({
    where: { v_id: req.params.id },
  });
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "vendor not found" });
  }
});

router.put("/updateVendor/:id", async (req, res) => {
  const result = await Vendor.update(
    {
      v_name: req.body.v_name,
      v_phone: req.body.v_phone,
      v_address: req.body.v_address,
      v_details: req.body.v_details,
    },
    {
      where: {
        v_id: req.params.id,
      },
    }
  );
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "vendor not found" });
  }
});

router.put("/toggleStatus/:id", (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;
  const sql = "UPDATE vendor SET status = ? WHERE v_id = ?";
  con.query(sql, [newStatus, id], (err, result) => {
    if (err) {
      return res.json({ Status: "Error updating status" });
    }
    return res.json({ Status: "Success" });
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM vendor WHERE v_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete vendor error in sql" });
    return res.json({ Status: "Success" });
  });
});

module.exports = router;
