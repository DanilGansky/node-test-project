const express = require("express");
const publicController = require("./publicController");

const router = express.Router();

router.get("/login", publicController.loginPage);

router.get("/register", publicController.registerPage);

router.get("/activate", publicController.activationPage);

module.exports = router;
