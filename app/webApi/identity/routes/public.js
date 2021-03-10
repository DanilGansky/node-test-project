const express = require("express");
const fs = require("fs");
const {publicController} = require("../controllers");

const router = express.Router();

router.get('/login', publicController.loginPage);

router.get('/register', publicController.registerPage);

router.get('/activate', publicController.activationPage);

module.exports = router;