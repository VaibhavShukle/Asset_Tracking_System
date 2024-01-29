// const express = require("express");
// const router = express.Router();
// const Checkin = require("../models/CheckIn");
// const con = require("../sql");

// router.post("/add_checkin", async (req, res) => {
//   try {
//     const { return_date, asset_id } = req.body; 

//     if (!Array.isArray(asset_id) || asset_id.length === 0) {
//       return res
//         .status(400)
//         .json({ error: "Asset IDs must be provided as a non-empty array." });
//     }

//     if (!return_date) {
//       return res.status(400).json({ error: "Return Date is required." });
//     }

//     const checkinPromises = asset_id.map((assetId) => {
//       return Checkout.create({
//         return_date, 
//         asset_id: assetId,
//       });
//     });

//     await Promise.all(checkinPromises);

//     for(const id of asset_ids){
//       await Asset.update({
//         accu_status:0
//       },{where:{asset_id:id}});
//     }

//     res.status(201).json({ message: "Check-in records added successfully." });
//   } catch (error) {
//     console.error("Error adding check-in records:", error);
//     res
//       .status(500)
//       .json({ error: "An error occurred while adding the check-in records." });
//   }
// });

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
//       "SELECT ua.*,ud.u_name,a.asset_name,a.asset_brand,a.asset_location FROM checkout AS ua LEFT JOIN assets AS a ON ua.asset_id=a.id LEFT JOIN user_details AS ud ON ua.user_id=ud.u_id WHERE a.asset_id =? LIMIT ? OFFSET ?";
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

// module.exports = router;
