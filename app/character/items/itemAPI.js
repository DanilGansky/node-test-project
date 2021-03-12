const express = require("express");
const itemController = require("./itemController");

const router = express.Router();

router.get("/items", itemController.findAll);

module.exports = router;
