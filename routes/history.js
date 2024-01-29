const express = require("express");
const sequelize = require("../db");
const router = express.Router();
const bodyParser = require("body-parser");
const con = require("../sql");
const History = require("../models/History");

router.use(bodyParser.json());

router.get("/getHistory/:id", async (req, res) => {
  const assetId = req.params.id;

  try {
    const history = await History.findAll({
      where: { asset_id: assetId },
    });

    if (history.length > 0) {
      return res.status(200).json({ Status: "Success", Result: history });
    } else {
      return res
        .status(404)
        .json({ Status: "Error", Message: "History not found" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ Status: "Error", Message: "Internal Server Error" });
  }
});

module.exports = router;
