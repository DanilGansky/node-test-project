const express = require("express");

const router = express.Router();
const repository = require("../characterRepository");
const service = require("./adminService")(repository);
const logger = require("../../logger");
const controller = require("./adminController")(service, logger);

router.get("/characters", controller.findAll);

router.get("/characters/:id", controller.findByID);

module.exports = router;
