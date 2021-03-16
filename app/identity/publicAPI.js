const express = require("express");
const { appConfig } = require("../config");

let controller;

// todo: make mocks
if (appConfig.TEST) {
} else {
  controller = require("./publicController");
}

const router = express.Router();

router.get("/login", controller.loginPage);

router.get("/register", controller.registerPage);

router.get("/activate", controller.activationPage);

module.exports = router;
