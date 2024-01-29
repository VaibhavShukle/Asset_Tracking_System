const { sequelize } = require("../ams_backend/db");
const express = require("express");
const authAPI = require("./routes/auth");
const dashboardAPI = require("./routes/dashboard");
const assetAPI = require("./routes/asset");
// const assetTypeAPI = require("./routes/assetType");
// const assetModelAPI = require("./routes/assetModel");
const locationAPI = require("./routes/location");
const assetBrandAPI = require("./routes/assetBrand");
const categoryAPI = require("./routes/category");
const subcategoryAPI = require("./routes/subcategory");
const departmentAPI = require("./routes/department");
const userAPI = require("./routes/user");
const vendorAPI = require("./routes/vendor");
const mainStatusAPI = require("./routes/main_status");
const imageAPI = require("./routes/image");
const checkoutAPI = require("./routes/checkout");
// const checkinAPI = require("./routes/checkin");
const documentAPI = require("./routes/document");
const warrantyAPI = require("./routes/warranty");
const maintenanceAPI = require("./routes/maintenance");
const depreciationAPI = require("./routes/depreciation");
const conditionAPI = require("./routes/condition");
const historyAPI = require("./routes/history");

const path = require("path");

const cors = require("cors");
const app = express();
const port = 8081;

// const corsOptions = {
//   origin: "http://localhost:3000", // Replace with your allowed origin
//   methods: "GET,POST,PUT,DELETE", // Specify the allowed HTTP methods
// };

app.use(
  "/public/images",
  express.static(path.join(__dirname, "public/images"))
);

app.use(
  "/public/stockimages",
  express.static(path.join(__dirname, "public/stockimages"))
);

// app.use(cors(corsOptions));
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authAPI);
app.use("/api/dashboard", dashboardAPI);
// app.use('/api/asset',authAPI)

app.use("/api/asset", assetAPI);

//Asset Type Master
// app.use("/api/assetType", assetTypeAPI);

//Location Master
app.use("/api/location", locationAPI);

//Assets Brands Master
app.use("/api/assetBrand", assetBrandAPI);

//Asset Model Master
// app.use("/api/assetModel", assetModelAPI);

//Category Master
app.use("/api/category", categoryAPI);

//Sub Category Master
app.use("/api/subcategory", subcategoryAPI);

//Department Master
app.use("/api/department", departmentAPI);

//Condition Master
app.use("/api/condition", conditionAPI);

//User Master
app.use("/api/user", userAPI);

//Vendor Master
app.use("/api/vendor", vendorAPI);

//Maintenance Status Master
app.use("/api/main_status", mainStatusAPI);

//CheckOut Master
app.use("/api/checkout", checkoutAPI);

//CheckIn Master
// app.use("/api/checkin", checkinAPI);

//Images
app.use("/api/image", imageAPI);

//Document
app.use("/api/document", documentAPI);

//Warranty
app.use("/api/warranty", warrantyAPI);

//Maintenance
app.use("/api/maintenance", maintenanceAPI);

//Maintenance
app.use("/api/depreciation", depreciationAPI);

//History
app.use("/api/history", historyAPI);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
