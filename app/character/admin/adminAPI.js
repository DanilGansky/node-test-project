const express = require("express");
const adminController = require("./adminController");

const router = express.Router();

router.get("/characters", adminController.findAll);

router.get("/characters/:id", adminController.findByID);

module.exports = router;
