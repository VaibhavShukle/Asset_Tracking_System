const express = require("express");
const sequelize = require("../db");
const Condition = require("../models/Condition");
const router = express.Router();
const con = require("../sql");
const { QueryTypes } = require("sequelize");

router.post("/add_condition", async (req, res) => {
  try {
    const data = await Condition.create({
      dept_name: req.body.dept_name,
    });

    res.send("Condition added successfully.");
  } catch (error) {
    console.error("Error adding condition:", error);
    res.status(500).send("An error occurred while adding the category.");
  }
});

router.get("/getCondition", async (req, res) => {
  const result = await Condition.findAll();
  return res.json({ Status: "Success", Result: result });
});

router.put("/toggleStatus/:id", async (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;

  const updateStatus = await Condition.update(
    {
      status: newStatus,
    },
    {
      where: {
        id,
      },
    }
  );

  if (updateStatus) {
    return res.json({ Status: "Success" });
  } else {
    return res.json({ Status: "Error updating status" });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const deleteStatus = await Condition.destroy({
      where: {
        id,
      },
    });

    if (deleteStatus !== 0) {
      return res.json({ Status: "Success" });
    } else {
      return res.json({ Status: "Error: Record not found or already deleted" });
    }
  } catch (error) {
    console.error("Error deleting record:", error);
    return res.status(500).json({ Status: "Internal Server Error" });
  }
});

module.exports = router;
