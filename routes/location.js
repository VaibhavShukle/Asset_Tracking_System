const express = require("express");
const sequelize = require("../db");
const Location = require("../models/Location");
const router = express.Router();
const con = require("../sql");

router.get("/getLocation", async (req, res) => {
  const sql = "SELECT * FROM location";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

// router.get("/getLocationName/:id", async (req, res) => {
//   const sql = "SELECT * FROM location WHERE location_id  = " + req.params.id;
//   const [result] = await sequelize.query(sql);
//   return res.json({ Status: "Success", Result: result });
// });

router.get("/getLocation/:id", async (req, res) => {
  const result = await Location.findOne({
    where: { location_id: req.params.id },
  });
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "location not found" });
  }
});

router.put("/updateLocation/:id", async (req, res) => {
  const result = await Location.update(
    {
      location_name: req.body.location_name,
      location_address: req.body.location_address,
      location_desc: req.body.location_desc,
    },
    {
      where: {
        location_id: req.params.id,
      },
    }
  );
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "location not found" });
  }
});

router.get("/getLocation/active", async (req, res) => {
  const sql = "SELECT * FROM location WHERE status = 'active'";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

router.post("/add_location", async (req, res) => {
  try {
    const data = await Location.create({
      location_name: req.body.location_name,
      location_address: req.body.location_address,
      location_desc: req.body.location_desc,
    });

    res.send("Location added successfully.");
  } catch (error) {
    console.error("Error adding location:", error);
    res.status(200).send("An error occurred while adding the location.");
  }
});

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM location WHERE location_id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete location error in sql" });
    return res.json({ Status: "Success" });
  });
});

router.put("/toggleStatus/:id", (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;

  const sql = "UPDATE location SET status = ? WHERE location_id = ?";
  con.query(sql, [newStatus, id], (err, result) => {
    if (err) {
      console.error("Error updating status:", err);
      return res.status(500).json({ Status: "Error updating status" });
    }

    return res.json({ Status: "Success" });
  });
});

module.exports = router;
