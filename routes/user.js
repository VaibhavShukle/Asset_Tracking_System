const express = require("express");
const sequelize = require("../db");
const User = require("../models/User");
const router = express.Router();
const con = require("../sql");
const Checkout = require("../models/Checkout");
const Condition = require("../models/Condition");
const Asset = require("../models/Asset");

router.post("/add_user", async (req, res) => {
  try {
    const data = await User.create({
      u_name: req.body.u_name,
      u_empid: req.body.u_empid,
      u_phone: req.body.u_phone,
      u_email: req.body.u_email,
      location_id: req.body.location_id,
      dept_id: req.body.dept_id,
    });

    res.send("User added successfully.");
  } catch (error) {
    console.error("Error adding category:", error);
    res.status(500).send("An error occurred while adding the category.");
  }
});

router.get("/getuser", async (req, res) => {
  const sql =
    "SELECT u.*,d.dept_name AS departmentName,l.location_name as locationName FROM user_details AS u JOIN location AS l ON u.location_id=l.location_id JOIN department AS d ON u.dept_id=d.dept_id";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

// router.get("/getuser/:id", async (req, res) => {
//   const sql = "SELECT * FROM user_details WHERE u_id= " + req.params.id;
//   const [result] = await sequelize.query(sql);
//   return res.json({ Status: "Success", Result: result });
// });

router.get("/getUser/:id", async (req, res) => {
  const result = await User.findOne({
    where: { u_id: req.params.id },
  });

  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "User not found" });
  }
});

router.get("/getAssets/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Checkout.findAll({
    where: {
      user_id: id,
    },
    include: [
      {
        model: Condition,
        as: "condition",
        attributes: ["condition"],
      },
      {
        model: Asset,
        as: "assetName",
        attributes: ["asset_name"],
      },
    ],
  });

  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "User not found" });
  }
});

router.put("/updateUser/:id", async (req, res) => {
  const result = await User.update(
    {
      u_name: req.body.u_name,
      u_empid: req.body.u_empid,
      u_phone: req.body.u_phone,
      u_email: req.body.u_email,
    },
    {
      where: {
        u_id: req.params.id,
      },
    }
  );
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "User not found" });
  }
});

router.get("/getuser/active", async (req, res) => {
  const sql = "SELECT * FROM user_details WHERE status = 'active'";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

router.put("/toggleStatus/:id", (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;
  const sql = "UPDATE user_details SET status = ? WHERE u_id = ?";
  con.query(sql, [newStatus, id], (err, result) => {
    if (err) {
      return res.json({ Status: "Error updating status" });
    }
    return res.json({ Status: "Success" });
  });
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM user_details WHERE u_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete assets error in sql" });
    return res.json({ Status: "Success" });
  });
});

module.exports = router;
