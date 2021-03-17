const express = require("express");

const router = express.Router();
const repository = require("./skillRepository");
const service = require("./skillService")(repository);
const logger = require("../../logger");
const controller = require("./skillController")(service, logger);

router.get("/skills", controller.findAll);

router.post("/skills", controller.create);

router.put("/skills/:id", controller.update);

router.delete("/skills/:id", controller.remove);

module.exports = router;
