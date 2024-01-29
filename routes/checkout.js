const express = require("express");
const router = express.Router();
const Checkout = require("../models/Checkout");
const con = require("../sql");
const Asset = require("../models/Asset");
const Condition = require("../models/Condition");
const User = require("../models/User");
const History = require("../models/History");
const { Op } = require("sequelize");
const sequelize = require("../db");

router.post("/add_checkout", async (req, res) => {
  try {
    const { user_id, asset_id, assign_date } = req.body;

    await Checkout.create({
      user_id,
      asset_id,
      assign_date,
    });

    await Asset.update(
      {
        status: 0,
      },
      { where: { asset_id: asset_id } }
    );

    await History.create({
      asset_id,
      date: new Date(),
      event: "checkout",
      field: "status",
      changedFrom: "Available",
      changedTo: "Unavailable",
    });

    res.send("AssetAssign added successfully.");
  } catch (error) {
    console.error("Error adding asset:", error);
    res.status(500).send("An error occurred while adding the asset type.");
  }
});

router.get("/getCheckout/:assetId", async (req, res) => {
  const assetId = req.params.assetId;

  try {
    const checkoutData = await Checkout.findOne({
      where: {
        asset_id: assetId,
        return_date: {
          [Op.is]: null,
        },
      },

      include: [
        {
          model: User,
          as: "u_name",
          attributes: ["u_name"],
        },
      ],
    });
    res.json({
      Status: "Success",
      data: checkoutData,
      Message: "Checkout data retrieved successfully.",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      Status: "Error",
      Message: "Internal Server Error.",
    });
  }
});

router.post("/add_checkin", async (req, res) => {
  try {
    const { return_date, asset_id, remark, condition_id, userAssign_id } =
      req.body;

    // if (!Array.isArray(asset_id) || asset_id.length === 0) {
    //   return res.status(400).json({
    //     error: "Asset IDs must be provided as a non-empty array.",
    //   });
    // }

    if (!return_date) {
      return res.status(400).json({ error: "Return Date is required." });
    }

    const update1 = await Asset.update(
      { return_date: return_date, status: 1 },
      {
        where: { asset_id: asset_id },
      }
    );

    await History.create({
      asset_id,
      date: new Date(),
      event: "checkin",
      field: "status",
      changedFrom: "Unavailable",
      changedTo: "Available",
    });

    const update = await Checkout.update(
      {
        return_date: return_date,
        remark: remark,
        product_condition: condition_id,
        status: 1,
      },
      { where: { userAssign_id } }
    );

    res.status(201).json({ message: "Check-in records updated successfully." });
  } catch (error) {
    console.error("Error updating check-in records:", error);
    res.status(500).json({
      error: "An error occurred while updating the check-in records.",
    });
  }
});

router.get("/getAssets", (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const offset = (page - 1) * limit;
  const sqlCount = "SELECT COUNT(*) as totalCount FROM assets";
  con.query(sqlCount, (err, countResult) => {
    if (err) {
      return res.json({ Error: "Error counting assets" });
    }

    const totalCount = countResult[0].totalCount;
    const sql =
      "SELECT ua.*,ud.u_name,a.asset_name,a.asset_brand,a.asset_location,d.dept_name FROM checkout AS ua LEFT JOIN assets AS a ON ua.asset_id=a.asset_id LEFT JOIN user_details AS ud ON ua.user_id=ud.u_id LEFT JOIN department AS d ON ua.dept_id=d.dept_id  LIMIT ? OFFSET ?";
    con.query(sql, [limit, offset], (err, result) => {
      if (err) return res.json({ Error: "Get assets error in SQL" });

      return res.json({
        Status: "Success",
        Result: result,
        TotalCount: totalCount,
      });
    });
  });
});

//Add_Checkin
// router.get("/getAssets/:id", (req, res) => {
//   const page = parseInt(req.query.page || 1);
//   const limit = parseInt(req.query.limit || 10);
//   const offset = (page - 1) * limit;
//   const sqlCount = "SELECT COUNT(*) as totalCount FROM assets";
//   con.query(sqlCount, (err, countResult) => {
//     if (err) {
//       return res.json({ Error: "Error counting assets" });
//     }

//     const totalCount = countResult[0].totalCount;
//     const sql =
//       "SELECT ua.*,ud.u_name,a.asset_name,a.asset_brand,a.asset_location,d.dept_name FROM checkout AS ua LEFT JOIN assets AS a ON ua.asset_id=a.asset_id LEFT JOIN user_details AS ud ON ua.user_id=ud.u_id LEFT JOIN department AS d ON ua.dept_id=d.dept_id WHERE a.asset_id=?  LIMIT ? OFFSET ?";
//     con.query(sql, [req.params.id, limit, offset], (err, result) => {
//       if (err) return res.json({ Error: "Get assets error in SQL" });

//       return res.json({
//         Status: "Success",
//         Result: result,
//         TotalCount: totalCount,
//       });
//     });
//   });
// });

// router.get("/getAsset/:id",async (req,res) => {
//   const result = await Checkout.findOne({
//     where: { asset_id: req.params.id },
//   });
//   console.log(result);
//   if (result) {
//     return res.json({ Status: "Success", Result: result });
//   } else {
//     return res.json({ Status: "False", message: "asset not found" });
//   }
// });

router.get("/getAsset/:id", async (req, res) => {
  const result = await Checkout.findOne({
    where: {
      asset_id: req.params.id,
      return_date: {
        [Op.is]: null,
      },
    },
    include: [
      {
        model: User,
        as: "u_name",
        attributes: ["u_name"],
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
    return res.json({ Status: "False", message: "asset not found" });
  }
});

router.get("/searchAsset", (req, res) => {
  const searchQuery = req.query.search || "";
  const sql = `SELECT * FROM checkout WHERE asset_id LIKE '%${searchQuery}%' OR asset_name LIKE '%${searchQuery}%' OR asset_brand LIKE '%${searchQuery}%'`;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "search asset error in sql" });
    return res.json({
      Status: true,
      Result: result,
    });
  });
});

//User_List
router.get("/getAssetsUser", (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const offset = (page - 1) * limit;
  const sqlCount = "SELECT COUNT(*) as totalCount FROM assets";
  con.query(sqlCount, (err, countResult) => {
    if (err) {
      return res.json({ Error: "Error counting assets" });
    }

    const totalCount = countResult[0].totalCount;
    const sql =
      "SELECT ua.*,ud.u_name,ud.u_empid,a.asset_name,a.asset_brand,a.asset_location,d.dept_name FROM checkout AS ua LEFT JOIN assets AS a ON ua.asset_id=a.asset_id LEFT JOIN user_details AS ud ON ua.user_id=ud.u_id LEFT JOIN department AS d ON ua.dept_id=d.dept_id  LIMIT ? OFFSET ?";
    con.query(sql, [limit, offset], (err, result) => {
      if (err) return res.json({ Error: "Get assets error in SQL" });

      return res.json({
        Status: "Success",
        Result: result,
        TotalCount: totalCount,
      });
    });
  });
});

//new APi for Report

// router.get("/getCheckOutAsset/", async (req, res) => {
//   const result = await Checkout.findAll({
//     where: {
//       status: 0,
//     },
//     include: [
//       {
//         model: User,
//         as: "u_name",
//         attributes: ["u_name"],
//       },
//       {
//         model: Asset,
//         as: "assetName",
//         attributes: ["asset_name"],
//       },
//     ],
//   });
//   if (result) {
//     return res.json({ Status: "Success", Result: result });
//   } else {
//     return res.json({ Status: "False", message: "Asset not found" });
//   }
// });

router.get("/getCheckOutAsset/", async (req, res) => {
  let condition = {};

  let userCondition = req.query.user_id ? { u_id: req.query.user_id } : "";

  if (req.query.status === "All Time") {
  } else {
    condition = {
      status: 0,
    };
  }

  console.log(userCondition);

  const result = await Checkout.findAll({
    where: condition,
    include: [
      {
        model: User,
        as: "u_name",
        attributes: ["u_name"],
        where: userCondition,
      },
      {
        model: Asset,
        as: "assetName",
        attributes: ["asset_name"],
      },
    ],
    order: ["userAssign_id"],
  });

  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "Asset not found" });
  }
});

router.get("/getAssetUser", async (req, res) => {
  const sql = `SELECT * FROM checkout ${
    req.query.user ? `WHERE asset_category=${req.query.user}` : ""
  }`;
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

module.exports = router;
