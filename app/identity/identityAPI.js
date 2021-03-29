const express = require("express");
const { authMiddleware } = require("../middlewares");

const router = express.Router();
const activationTokenRepository = require("./activation/activationTokenRepository");
const activationCodeRepository = require("./activation/activationCodeRepository");
const accessTokenRepository = require("./activation/accessTokenRepository");
const userRepository = require("./users/userRepository");
const emailService = require("./emailService")(activationTokenRepository);
const smsService = require("./smsService")(activationCodeRepository);
const eventSenderService = require("./eventSenderService");
const logger = require("../logger");

const authService = require("./authService")(
  emailService,
  smsService,
  userRepository,
  eventSenderService,
  activationTokenRepository,
  accessTokenRepository,
  activationCodeRepository
);

const identityController = require("./identityController")(authService, logger);

router.post("/register", identityController.register);

router.post("/login", identityController.login);

router.post("/send-activation-code", identityController.sendActivationCode);

router.post("/activate", identityController.activate);

router.use(authMiddleware).post("/logout", identityController.logout);

module.exports = router;
