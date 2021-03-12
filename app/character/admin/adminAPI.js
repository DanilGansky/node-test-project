const express = require("express");
const { appConfig } = require("../../config");

const router = express.Router();

let repository;
let service;
let controller;

// todo: make mocks
if (appConfig.TEST) {
} else {
  repository = require("../characterRepository");
  service = require("./adminService")(repository);
  controller = require("./adminController")(service);
}

router.get("/characters", controller.findAll);

router.get("/characters/:id", controller.findByID);

module.exports = router;
