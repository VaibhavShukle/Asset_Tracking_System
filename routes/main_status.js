const express = require("express");
const sequelize = require("../db");
const Main_Status = require("../models/Main_Status");
const router = express.Router();
const con = require("../sql");

router.post("/add_main_status", async (req, res) => {
  try {
    const data = await Main_Status.create({
      mainStatus_name: req.body.mainStatus_name,
    });

    res.send("Maintenance Status added successfully.");
  } catch (error) {
    console.error("Error adding Maintenance Status:", error);
    res
      .status(500)
      .send("An error occurred while adding the Maintenance Status.");
  }
});

// router.get("/getMain_Status/active/:id", async (req, res) => {
//   const sql = "SELECT * FROM main_status ";
//   const [result] = await sequelize.query(sql);
//   return res.json({ Status: "Success", Result: result });
// });

router.get("/getMain_Status/:id", async (req, res) => {
  const result = await Main_Status.findOne({
    where: { mainStatus_id: req.params.id },
  });
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({
      Status: "False",
      message: "Maintenance Status not found",
    });
  }
});

router.get("/getMain_Status", async (req, res) => {
  const sql = "SELECT * FROM main_status WHERE status = 'active'";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

router.put("/toggleStatus/:id", (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;
  const sql = "UPDATE main_status SET status = ? WHERE mainStatus_id = ?";
  con.query(sql, [newStatus, id], (err, result) => {
    if (err) {
      return res.json({ Status: "Error updating Maintenance Status" });
    }
    return res.json({ Status: "Success" });
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM main_status WHERE mainStatus_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err)
      return res.json({ Error: "delete Maintenance Status error in sql" });
    return res.json({ Status: "Success" });
  });
});

module.exports = router;
