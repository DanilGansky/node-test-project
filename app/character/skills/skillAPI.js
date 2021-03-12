const express = require("express");
const { appConfig } = require("../../config");

const router = express.Router();

let repository;
let service;
let controller;
let logger;

// todo: make mocks
if (appConfig.TEST) {
} else {
  repository = require("./skillRepository");
  service = require("./skillService")(repository);
  logger = require("../../logger");
  controller = require("./skillController")(service, logger);
}

router.get("/skills", controller.findAll);

router.post("/skills", controller.create);

router.put("/skills/:id", controller.update);

router.delete("/skills/:id", controller.remove);

module.exports = router;
