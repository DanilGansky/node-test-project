const express = require("express");
const handlers = require("../handlers");

const router = express.Router();

router.post("/register", handlers.register);

router.post("/send-activation-code", handlers.sendActivationCode);

router.post("/activate", handlers.activate);

module.exports = router;