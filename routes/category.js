const express = require("express");
const sequelize = require("../db");
const Category = require("../models/Category");
const router = express.Router();
const con = require("../sql");
const Asset = require("../models/Asset");

router.post("/add_category", async (req, res) => {
  try {
    const data = await Category.create({
      category_name: req.body.category_name,
    });

    res.send("Category added successfully.");
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).send("An error occurred while adding the category.");
  }
});

router.get("/getcategory", async (req, res) => {
  const sql = "SELECT * FROM category ";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

router.get("/getCategory/:id", async (req, res) => {
  const result = await Category.findOne({
    where: { category_id: req.params.id },
  });
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "category not found" });
  }
});

router.put("/updateCategory/:id", async (req, res) => {
  const result = await Category.update(
    { category_name: req.body.category_name },
    {
      where: {
        category_id: req.params.id,
      },
    }
  );
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "category not found" });
  }
});

router.get("/getcategory/active", async (req, res) => {
  const sql = "SELECT * FROM category WHERE status = 1";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

router.put("/toggleStatus/:id", (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;
  const sql = "UPDATE category SET status = ? WHERE category_id = ?";
  con.query(sql, [newStatus, id], (err, result) => {
    if (err) {
      return res.json({ Status: "Error updating status" });
    }
    return res.json({ Status: "Success" });
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM category WHERE category_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete assets error in sql" });
    return res.json({ Status: "Success" });
  });
});

router.get("/assets/:id", async (req, res) => {
  try {
    const assets = await Asset.findAll({
      where: {
        category_id: req.params.id,
      },
    });
    res.json(assets);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching assets" });
  }
});

router.get("/getAssetByCategory", async (req, res) => {
  try {
    const page = parseInt(req.query.page || 1);
    const limit = parseInt(req.query.limit || 10);
    const offset = (page <= 0 ? 1 : page - 1) * limit;

    // Count query
    const sqlCount = "SELECT COUNT(*) as totalCount FROM assets";

    const countResult = await sequelize.query(sqlCount, {
      type: sequelize.QueryTypes.SELECT,
    });
    const totalCount = countResult[0].totalCount;

    const totalPages = Math.ceil(totalCount / (req.query.limit || 10));

    const sql = `SELECT * FROM assets  ${
      req.query.category
        ? `WHERE asset_category=${req.query.category} LIMIT :limit OFFSET :offset`
        : ""
    }`;
    const result = await sequelize.query(sql, {
      replacements: { limit, offset },
      type: sequelize.QueryTypes.SELECT,
    });
    return res.json({
      Status: "Success",
      Result: result,
      TotalCount: totalCount,
      TotalPages: totalPages,
    });
    // const [result] = await sequelize.query(sql);
    // return res.json({
    //   Status: "Success",
    //   Result: result,
    //   TotalCount: totalCount,
    // });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ Error: "Internal Server Error" });
  }
});

module.exports = router;
