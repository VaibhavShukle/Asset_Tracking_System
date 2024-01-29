const express = require("express");
const multer = require("multer");
const path = require("path");
const sequelize = require("../db");
const Asset = require("../models/Asset");
const router = express.Router();
const con = require("../sql");
const Condition = require("../models/Condition");
const Location = require("../models/Location");
const User = require("../models/User");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

router.post("/add_asset", upload.single("asset_image"), async (req, res) => {
  try {
    const prevAsset = await Asset.findAll({
      order: [["id", "DESC"]],
    });

    let num = 1000;

    const asset_id = "WHT" + (num + prevAsset.length + 1);

    const data = await Asset.create({
      asset_id: asset_id,
      asset_name: req.body.asset_name,
      asset_brand: req.body.asset_brand,
      asset_model: req.body.asset_model,
      asset_Cost: req.body.asset_Cost,
      asset_purchaseDate: req.body.asset_purchaseDate,
      asset_vendorInfo: req.body.asset_vendorInfo,
      asset_serialNumber: req.body.asset_serialNumber,
      asset_owner: req.body.asset_owner,
      asset_location: req.body.asset_location,
      asset_department: req.body.asset_department,
      asset_category: req.body.asset_category,
      asset_condition: req.body.asset_condition,
      asset_subCategory: req.body.asset_subCategory,
      asset_image: req.file ? req.file.path : req.body.asset_image,
      depreciation_percentage: req.body.depreciation_percentage,
      asset_life: req.body.asset_life,
    });

    res.send("Asset added successfully.");
  } catch (error) {
    console.error("Error adding asset:", error);
    res.status(500).send("An error occurred while adding the asset.");
  }
});

// router.get("/getAsset", (req, res) => {
//   const sql = "SELECT * FROM assets";
//   sequelize.query(sql, (err, result) => {
//     if (err) return res.json({ Error: "Get asset error in sql" });
//     return res.json({ Status: "Success", Result: result });
//   });
// });

// router.get('/getAssetTypes/active', async (req, res) => {
//     const sql = "SELECT * FROM assets_type WHERE status = 'active'";
//     const [result]=await sequelize.query(sql)
//     return res.json({ Status: "Success", Result: result })

// })

// router.get("/getAssetTypes/active", async (req, res) => {
//   const sql = "SELECT * FROM assets_type WHERE status = 'active'";

//   try {
//     const [result] = await sequelize.query(sql);
//     return res.json({ Status: "Success", Result: result });
//   } catch (error) {
//     console.error(error);
//     return res
//       .status(500)
//       .json({ Status: "Error", Message: "Internal server error" });
//   }
// });

// router.get("/getAssetModel/active", async (req, res) => {
//   const sql = "SELECT * FROM model WHERE status = 'active'";
//   const [result] = await sequelize.query(sql);
//   return res.json({ Status: "Success", Result: result });
// });

router.get("/getAssetCategory/active", async (req, res) => {
  const sql = "SELECT * FROM category WHERE status = 'active'";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

router.get("/getAssetsubCategory/active", async (req, res) => {
  const sql = "SELECT * FROM sub_category WHERE status = 'active'";
  const [result] = await sequelize.query(sql);
  return res.json({ Status: "Success", Result: result });
});

router.get("/get/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM assets WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get assets error in sql" });
    return res.json({ Status: "Success", Result: result });
  });
});

router.put("/update/:id", upload.single("asset_image"), (req, res) => {
  const id = req.params.id;
  const sql = `UPDATE assets 
    SET 
      asset_id = ?,
      asset_name = ?,
      user_id = ?,
      asset_brand = ?,
      asset_model = ?,
      asset_Cost = ?,
      asset_purchaseDate = ?,
      asset_vendorInfo = ?,
      asset_serialNumber = ?,
      asset_owner = ?,
      asset_location = ?,
      asset_category = ?,
      asset_physicalCondition = ?,
      asset_image = ?
    WHERE id = ?`;

  const assetImage = req.file ? "public/images/" + req.file.filename : null;

  con.query(
    sql,
    [
      req.body.asset_id,
      req.body.asset_name,
      req.body.user_id,
      req.body.asset_brand,
      req.body.asset_model,
      req.body.asset_Cost,
      req.body.asset_purchaseDate,
      req.body.asset_vendorInfo,
      req.body.asset_serialNumber,
      req.body.asset_owner,
      req.body.asset_location,
      req.body.asset_category,
      req.body.asset_physicalCondition,
      assetImage,
      id,
    ],
    (err, result) => {
      if (err) {
        return res.json({ Error: "Update asset error in SQL" });
      }
      return res.json({ Status: "Success" });
    }
  );
});

// app.put('/update/:id', (req, res) => {
//     const id = req.params.id;
//     const sql = "UPDATE employee set name= ?, email=?, password=?, salary = ?, address=?   WHERE id = ?";
//     con.query(sql, [req.body.name, req.body.email, req.body.password, req.body.salary, req.body.address, id], (err, result) => {
//         if (err) return res.json({ Error: "update employee error in sql" });
//         return res.json({ Status: "Success" })
//     })
// })

router.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM assets WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "delete assets error in sql" });
    return res.json({ Status: "Success" });
  });
});

router.get("/searchAsset", (req, res) => {
  // const token = req.headers.token;
  const searchQuery = req.query.search || "";
  const sql = `SELECT * FROM assets WHERE asset_id LIKE '%${searchQuery}%' OR asset_name LIKE '%${searchQuery}%' OR asset_brand LIKE '%${searchQuery}%'`;
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "search asset error in sql" });
    return res.json({
      Status: true,
      Result: result,
    });
  });
});

router.get("/getAssetCount", (req, res) => {
  const page = parseInt(req.query.page || 1);
  const limit = parseInt(req.query.limit || 10);
  const offset = ((page <= 0 ? 1 : page + 1) - 1) * limit;
  const sqlCount = "SELECT COUNT(*) as totalCount FROM assets";
  con.query(sqlCount, (err, countResult) => {
    if (err) {
      return res.json({ Error: "Error counting assets" });
    }

    const totalCount = countResult[0].totalCount;
    const sql =
      "SELECT a.*,c.category_name, s.subcategory_name, m.condition FROM assets AS a LEFT JOIN category AS c ON c.category_id=a.asset_category LEFT JOIN sub_category AS s ON s.subcategory_id=a.asset_subcategory LEFT JOIN asset_condition AS m ON m.id = a.asset_condition LIMIT ? OFFSET ?";
    con.query(sql, [limit, offset], (err, result) => {
      if (err) {
        return res.json({ Error: "Get assets error in SQL" });
      }

      return res.json({
        Status: "Success",
        Result: result,
        TotalCount: totalCount,
      });
    });
  });
});

router.put("/toggleStatus/:id", (req, res) => {
  const id = req.params.id;
  const newStatus = req.body.status;
  const sql = "UPDATE assets SET status = ? WHERE id = ?";
  con.query(sql, [newStatus, id], (err, result) => {
    if (err) {
      return res.json({ Status: "Error updating status" });
    }
    return res.json({ Status: "Success" });
  });
});

router.get("/activeAsset", (req, res) => {
  const sql = "Select count(id) as asset_id from assets";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

router.get("/assetValue", (req, res) => {
  const sql = "Select sum(asset_Cost) as asset_Cost from assets";
  con.query(sql, (err, result) => {
    if (err) return res.json({ Error: "Error in runnig query" });
    return res.json(result);
  });
});

router.get("/getAsset/:id", async (req, res) => {
  const result = await Asset.findOne({
    where: { asset_id: req.params.id },
    include: [
      {
        model: Condition,
        as: "condition",
        attributes: ["condition"],
      },
      {
        model: Location,
        as: "location_name",
        attributes: ["location_name"],
      },
      // {
      //   model: User,
      //   as: 'u_name',
      //   attributes: ['u_name'],
      // },
    ],
  });
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "asset not found" });
  }
});

router.get("/getAssetPage/:id", (req, res) => {
  const id = req.params.id;
  const sql = "SELECT * FROM assets WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Error: "Get assets error in sql" });
    const currentAsset = result[0];

    const currentIndex = result.findIndex((asset) => asset.asset_id === id);

    const nextAssetId = result[currentIndex + 1]?.asset_id || null;
    const prevAssetId = result[currentIndex - 1]?.asset_id || null;

    return res.json({
      Status: "Success",
      Result: result,
      currentAsset,
      nextAssetId,
      prevAssetId,
    });
  });
});

router.put("/updateAsset/:id", async (req, res) => {
  const result = await Asset.update(
    {
      depreciation_percentage: req.body.depreciation_percentage,
      asset_life: req.body.asset_life,
    },
    {
      where: {
        asset_id: req.params.id,
      },
    }
  );
  if (result) {
    return res.json({ Status: "Success", Result: result });
  } else {
    return res.json({ Status: "False", message: "asset not found" });
  }
});

router.get("/getAsset", async (req, res) => {
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

    // Data query
    const sql = "SELECT * FROM assets LIMIT :limit OFFSET :offset";
    const result = await sequelize.query(sql, {
      replacements: { limit, offset },
      type: sequelize.QueryTypes.SELECT,
    });

    return res.json({
      Status: "Success",
      Result: result,
      TotalCount: totalCount,
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ Error: "Internal Server Error" });
  }
});

module.exports = router;
