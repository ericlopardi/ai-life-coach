const express = require("express");
const router = express.Router();
const authService = require("../service/authService.js");

router.post("/login", (req, res) => {
    console.log("Entered authController login route");
    // call authService login function
    authService.loginService();

    return res.status(200).send({
        message: "Login successful",
    });
})

module.exports = router;