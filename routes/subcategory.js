const express = require("express");
const sequelize = require("../db");
const Sub_Category = require("../models/Sub_Category");
const router = express.Router();
const con = require("../sql");

router.post("/add_subcategory", async (req, res) => {
  try {
    const data = await Sub_Category.create({
      subcategory_name: req.body.subcategory_name,
      category_id: req.body.selectedCategoryId,
    });

    res.send("Sub Category added successfully.");
  } catch (error) {
    console.error("Error adding sub category:", error);
    res.status(500).send("An error occurred while adding the sub category.");
  }
});

router.get("/getsubcategory", async (req, res) => {
  const sql = "SELECT * FROM sub_category ";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

router.get("/getSubcategory/:id", async (req, res) => {
  const result = await Sub_Category.findOne({
    where: { subcategory_id: req.params.id },
  });
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "subcategory not found" });
  }
});

router.get("/getSubcategoryName/:id", async (req, res) => {
  const result = await Sub_Category.findAll({
    where: { category_id: req.params.id },
  });
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "subcategory not found" });
  }
});

router.put("/updateCategory/:id", async (req, res) => {
  const result = await Sub_Category.update(
    { subcategory_name: req.body.subcategory_name },
    {
      where: {
        subcategory_id: req.params.id,
      },
    }
  );
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "subcategory not found" });
  }
});

router.get("/getsubcategory/active", async (req, res) => {
  const sql = "SELECT * FROM sub_category WHERE status = 1";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

router.put("/toggleStatus/:id", (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;
  const sql = "UPDATE sub_category SET status = ? WHERE subcategory_id = ?";
  con.query(sql, [newStatus, id], (err, result) => {
    if (err) {
      return res.json({ Status: "Error updating status" });
    }
    return res.json({ Status: "Success" });
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM sub_category WHERE subcategory_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete sub_category error in sql" });
    return res.json({ Status: "Success" });
  });
});

module.exports = router;
