const express = require("express");
const { appConfig } = require("../../config");

const router = express.Router();

let repository;
let service;
let controller;

// todo: make mocks
if (appConfig.TEST) {
} else {
  repository = require("./skillRepository");
  service = require("./skillService")(repository);
  controller = require("./skillController")(service);
}

router.get("/skills", controller.findAll);

router.post("/skills", controller.create);

router.put("/skills/:id", controller.update);

router.delete("/skills/:id", controller.remove);

module.exports = router;
