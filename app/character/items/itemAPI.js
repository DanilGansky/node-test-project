const express = require("express");

const router = express.Router();
const repository = require("./itemRepository");
const service = require("./itemService")(repository);
const logger = require("../../logger");
const controller = require("./itemController")(service, logger);

router.get("/items", controller.findAll);

router.post("/items", controller.create);

router.put("/items/:id", controller.update);

router.delete("/items/:id", controller.remove);

module.exports = router;
