const express = require("express");
const adminController = require("./adminController");

const router = express.Router();

router.get("/characters", adminController.findAll);

router.get("/characters/:id", adminController.findByID);

router.get("/skills", adminController.findAllSkills);

router.get("/items", adminController.findAllItems);

module.exports = router;
