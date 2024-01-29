const express = require("express");
const sequelize = require("../db");
const Department = require("../models/Department");
const router = express.Router();
const con = require("../sql");

router.post("/add_department", async (req, res) => {
  try {
    const data = await Department.create({
      dept_name: req.body.dept_name,
    });

    res.send("Category added successfully.");
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).send("An error occurred while adding the category.");
  }
});

router.get("/getDepartment", async (req, res) => {
  const sql = "SELECT * FROM department ";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

router.get("/getDepartment/:id", async (req, res) => {
  const result = await Department.findOne({
    where: { dept_id: req.params.id },
  });
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "department not found" });
  }
});

router.put("/updateDepartment/:id", async (req, res) => {
  const result = await Department.update(
    { dept_name: req.body.dept_name },
    {
      where: {
        dept_id: req.params.id,
      },
    }
  );
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "department not found" });
  }
});

router.get("/getDepartment/active", async (req, res) => {
  const sql = "SELECT * FROM department WHERE status = 'active'";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

router.put("/toggleStatus/:id", (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;
  const sql = "UPDATE department SET status = ? WHERE dept_id = ?";
  con.query(sql, [newStatus, id], (err, result) => {
    if (err) {
      return res.json({ Status: "Error updating status" });
    }
    return res.json({ Status: "Success" });
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM department WHERE dept_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete assets error in sql" });
    return res.json({ Status: "Success" });
  });
});

router.get("/getAssetByDept", async (req, res) => {
  const sql = `SELECT * FROM assets ${
    req.query.department ? `WHERE asset_department=${req.query.department}` : ""
  }`;
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

module.exports = router;
