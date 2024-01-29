const express = require("express");
const sequelize = require("../db");
const bodyParser = require("body-parser");
const Maintenance = require("../models/Maintenance");
const router = express.Router();
const Main_Status = require("../models/Main_Status");
const con = require("../sql");
const History = require("../models/History");

router.use(bodyParser.json());

// Correct the route for adding maintenance
// router.post("/add_maintenance/:id", async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       main_title,
//       main_details,
//       main_date,
//       main_by,
//       mainStatus_id,
//       main_complete,
//       main_cost,
//     } = req.body;

//     const data = await Maintenance.create({
//       asset_id: id,
//       main_title,
//       main_details,
//       main_date,
//       main_by,
//       mainStatus_id,
//       main_complete,
//       main_cost,
//     });

//     await History.create({
//       asset_id: id,
//       date: new Date(),
//       event: "history",
//       field: "history",
//       changedFrom: "",
//       changedTo: "",
//     });

//     res
//       .status(200)
//       .json({ Status: "Success", Message: "Maintenance added successfully." });
//   } catch (error) {
//     console.error("Error adding maintenance:", error);
//     res.status(500).json({
//       Status: "Error",
//       Message: "An error occurred while adding the maintenance.",
//     });
//   }
// });

router.post("/add_maintenance/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const {
      main_title,
      main_details,
      main_date,
      main_by,
      mainStatus_id,
      main_complete,
      main_cost,
      main_warranty,
    } = req.body;

    const maintenance = await Maintenance.create({
      asset_id: id,
      main_title,
      main_details,
      main_date,
      main_by,
      mainStatus_id,
      main_complete,
      main_cost,
      main_warranty,
    });

    await History.create({
      asset_id: id,
      date: new Date(),
      event: "Maintenance",
      field: "Maintenance",
      changedFrom: "",
      changedTo: "",
    });

    res.status(201).json({ Status: "Success", Result: maintenance });
  } catch (error) {
    console.error("Error adding Maintenance:", error);
    res.status(500).json({
      Status: "Error",
      Error: "An error occurred while adding the Maintenance.",
    });
  }
});

router.get("/getMaintenance/:id", async (req, res) => {
  const assetId = req.params.id;

  try {
    const maintenances = await Maintenance.findAll({
      where: { asset_id: assetId },
      include: [{ model: Main_Status, as: "status" }],
    });

    return res.status(200).json({ Status: "Success", Result: maintenances });
  } catch (error) {
    return res
      .status(500)
      .json({ Status: "Error", Message: "Internal Server Error" });
  }
});

// Update Maintenance
// router.post("/update/:id", async (req, res) => {
//   const id = req.params.id;
//   const {
//     main_title,
//     main_details,
//     main_date,
//     main_by,
//     mainStatus_id,
//     main_complete,
//     main_cost,
//   } = req.body;

//   const sql =
//     "UPDATE maintenance SET main_title=?, main_details=?, main_date=?, main_by=?, mainStatus_id=?, main_complete=?, main_cost=? WHERE main_id=?";
//   con.query(
//     sql,
//     [
//       main_title,
//       main_details,
//       main_date,
//       main_by,
//       mainStatus_id,
//       main_complete,
//       main_cost,
//       id,
//     ],
//     (err, result) => {
//       if (err) {
//         return res.json({ Error: "Update maintenance error in SQL" });
//       }
//       return res.json({ Status: "Success" });
//     }
//   );
// });

// router.put("/updateMaintenance/:id", async (req, res) => {
//   console.log(req.params);
//   const result = await Maintenance.update(
//     {
//       main_title: req.body.main_title,
//       main_details: req.body.main_details,
//       main_date: req.body.main_date,
//       main_by: req.body.main_by,
//       mainStatus_id: req.body.mainStatus_id,
//       main_complete: req.body.main_complete,
//       main_cost: req.body.main_cost,
//     },
//     {
//       where: {
//         main_id: req.params.id,
//       },
//     }
//   );
//   if (result) {
//     return res.json({ Status: "Success", Result: result });
//   } else {
//     return res.json({ Status: "False", message: "maintenance not found" });
//   }
// });

router.put("/updateMaintenance/:id", async (req, res) => {
  const { id } = req.params;

  const { updatedFields, ...updateData } = req.body;

  const existingMaintenance = await Maintenance.findOne({
    where: {
      main_id: id,
    },
  });

  if (!existingMaintenance) {
    return res.json({ Status: "False", message: "Maintenance not found" });
  }

  const result = await Maintenance.update(updateData, {
    where: {
      main_id: id,
    },
  });

  const assetId = existingMaintenance.asset_id;

  for (const change of updatedFields) {
    if (change.attribute == "mainStatus_id") {
      var changedStatusData = await Main_Status.findOne({
        where: { mainStatus_id: change.changedTo },
      });
      var previousData = await Main_Status.findOne({
        where: { mainStatus_id: change.changedFrom },
      });
    }
    await History.create({
      asset_id: assetId,
      date: new Date(),
      event: `Maintenance(update)`,
      field: change.attribute,
      changedFrom:
        change.attribute == "mainStatus_id"
          ? previousData.mainStatus_name
          : change.changedFrom,
      changedTo:
        change.attribute == "mainStatus_id"
          ? changedStatusData.mainStatus_name
          : change.changedTo,
    });
  }

  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "Maintenance not found" });
  }
});

router.put("/toggleStatus/:id", async (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;

  try {
    const maintenance = await Maintenance.findByPk(id);

    if (!maintenance) {
      return res
        .status(404)
        .json({ Status: "Error", Message: "Maintenance not found" });
    }

    maintenance.status = newStatus;
    await maintenance.save();

    return res.status(200).json({
      Status: "Success",
      Message: "Maintenance status updated successfully.",
    });
  } catch (error) {
    console.error("Error updating maintenance status:", error);
    return res.status(500).json({
      Status: "Error",
      Message: "An error occurred while updating the maintenance status.",
    });
  }
});

router.delete("/delete/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const maintenance = await Maintenance.findByPk(id);

    if (!maintenance) {
      return res
        .status(404)
        .json({ Status: "Error", Message: "Maintenance not found" });
    }

    await maintenance.destroy();

    return res.status(200).json({
      Status: "Success",
      Message: "Maintenance deleted successfully.",
    });
  } catch (error) {
    console.error("Error deleting maintenance:", error);
    return res.status(500).json({
      Status: "Error",
      Message: "An error occurred while deleting the maintenance.",
    });
  }
});

router.get("/getMaintenanceAsset", async (req, res) => {
  const sql = `
  SELECT m.*, a.asset_name, a.asset_id, ms.mainStatus_name
  FROM maintenance AS m
  LEFT JOIN assets AS a ON m.asset_id = a.id
  LEFT JOIN main_status AS ms ON m.mainStatus_id = ms.mainStatus_id
`;
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

module.exports = router;
