const express = require("express");
const { appConfig } = require("../config");

const router = express.Router();

let activationCodeRepository;
let userRepository;
let activationTokenRepository;
let accessTokenRepository;

let emailService;
let smsService;
let eventSenderService;
let authService;

let identityController;

// todo: make mocks
if (appConfig.TEST) {
} else {
  activationTokenRepository = require("./activation/activationTokenRepository");
  activationCodeRepository = require("./activation/activationCodeRepository");
  accessTokenRepository = require("./activation/accessTokenRepository");
  userRepository = require("./users/userRepository");
  emailService = require("./emailService")(activationTokenRepository);
  smsService = require("./smsService")(activationCodeRepository);
  eventSenderService = require("./eventSenderService");
  authService = require("./authService")(
    emailService,
    smsService,
    userRepository,
    eventSenderService,
    activationTokenRepository,
    accessTokenRepository,
    activationCodeRepository
  );

  identityController = require("./identityController")(authService);
}

router.post("/register", identityController.register);

router.post("/login", identityController.login);

router.post("/logout", identityController.logout);

router.post("/send-activation-code", identityController.sendActivationCode);

router.post("/activate", identityController.activate);

module.exports = router;
