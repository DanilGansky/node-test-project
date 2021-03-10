const express = require("express");
const fs = require("fs");
const {publicController} = require("../controllers");

const router = express.Router();

router.get('/', publicController.loginPage);

router.get('/activate', publicController.activationPage);

module.exports = router;