const express = require("express");
const { appConfig } = require("../../config");

const router = express.Router();

let repository;
let service;
let controller;

// todo: make mocks
if (appConfig.TEST) {
} else {
  repository = require("./itemRepository");
  service = require("./itemService")(repository);
  controller = require("./itemController")(service);
}

router.get("/items", controller.findAll);

router.post("/items", controller.create);

router.put("/items/:id", controller.update);

router.delete("/items/:id", controller.remove);

module.exports = router;
