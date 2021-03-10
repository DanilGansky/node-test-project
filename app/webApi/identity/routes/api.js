const express = require("express");
const {identityController} = require("../controllers");

const router = express.Router();

router.post("/register", identityController.register);

router.post("/login", identityController.login);

router.post("/logout", identityController.logout);

router.post("/send-activation-code", identityController.sendActivationCode);

router.post("/activate", identityController.activate);

module.exports = router;