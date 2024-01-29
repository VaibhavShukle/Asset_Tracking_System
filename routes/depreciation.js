// const express = require("express");
// const sequelize = require("../db");
// const Depreciation = require("../models/Depreciation");
// const router = express.Router();
// const con = require("../sql");

// router.post("/add_depreciation", async (req, res) => {
//   try {
//     const data = await Depreciation.create({
//       depreciation_cost: req.body.depreciation_cost,
//       asset_life: req.body.asset_life,
//       date_acquired: req.body.date_acquired,
//       salvageValue: req.body.salvageValue,
//       depreciation_Type: req.body.depreciation_Type,
//     });

//     res.send({ message: "Depreciation added successfully.", data: data });
//   } catch (error) {
//     console.error("Error adding Depreciation:", error);
//     res.status(500).send("An error occurred while adding the Depreciation.");
//   }
// });

// router.get("/getDepreciation/:id", async (req, res) => {
//   console.log(req.params.id)
//   const result = await Depreciation.findOne({

//     where: { depreciation_id: req.params.id },
//   });
//   console.log(result);
//   if (result) {
//     return res.json({ Status: "Success", Result: result });
//   } else {
//     return res.json({ Status: "False", message: "depreciation not found" });
//   }
// });

// module.exports = router;

const express = require("express");
const sequelize = require("../db");
const Depreciation = require("../models/Depreciation");
const router = express.Router();
const con = require("../sql");

router.post("/add_depreciation", async (req, res) => {
  try {
    const data = await Depreciation.create({
      depreciation_percentage: req.body.depreciation_percentage,
      asset_life: req.body.asset_life,
    });

    res.send({ message: "Depreciation added successfully.", data: data });
  } catch (error) {
    console.error("Error adding Depreciation:", error);
    res.status(500).send("An error occurred while adding the Depreciation.");
  }
});

router.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM depreciation WHERE depreciation_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get depreciation error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

module.exports = router;
