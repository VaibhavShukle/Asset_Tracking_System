const express = require("express");
const jwt = require("jsonwebtoken");
const { Sequelize } = require("sequelize");
const Login = require("../models/Login");
const router = express.Router();

router.get("/", async (req, res) => {
  const user = await Login.findAll();
  res.status(200).json(user);
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Login.findOne({
      where: {
        email: email,
      },
    });

    if (user && user.password === password) {
      const token = jwt.sign({ role: "admin" }, "jwt-secret-key", {
        expiresIn: "1d",
      });
      return res.json({ status: "Success", token: token });
    } else {
      return res.json({ status: "Error", error: "Wrong Credentials" });
    }
  } catch (err) {
    console.error("Error:", err);
    return res.json({ status: "Error", error: "Error in login process" });
  }
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: "Success" });
});

const verifyUser = (req, res, next) => {
  const token = req.headers.token;
  if (!token) {
    return res.json({ Error: "You are no Authenticated" });
  } else {
    jwt.verify(token, "jwt-secret-key", (err, decoded) => {
      if (err) return res.json({ Error: "Token wrong" });
      req.role = decoded.role;
      req.id = decoded.id;
      next();
    });
  }
};

router.get("/dashboard", verifyUser, (req, res) => {
  return res.json({ Status: "Success", role: req.role, id: req.id });
});

module.exports = router;
