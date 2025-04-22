const express = require("express");
const router = express.Router();

// Example authentication-related routes
router.post("/login", (req, res) => {
  res.send("User login");
});

router.post("/register", (req, res) => {
  res.send("User registration");
});

module.exports = router;
