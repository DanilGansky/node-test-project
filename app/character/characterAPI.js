const express = require("express");
const multer = require("multer");
const { appConfig } = require("../config");

const router = express.Router();
const upload = multer();

let characterRepo;
let skillRepo;
let itemRepo;
let statRepo;

let service;
let controller;

let uploader;
let eventConsumer;
let logger;

// todo: make mocks
if (appConfig.TEST) {
} else {
  logger = require("../logger");
  characterRepo = require("./characterRepository");
  skillRepo = require("./skills/skillRepository");
  itemRepo = require("./items/itemRepository");
  statRepo = require("./statRepository");
  uploader = require("../uploading/uploadService");
  service = require("./characterService")(
    characterRepo,
    skillRepo,
    itemRepo,
    uploader,
    statRepo
  );

  controller = require("./characterController")(service, logger);
  eventConsumer = require("./eventConsumer")(service);
}

eventConsumer.startReceiving();

router.get("/me", controller.findByID);

router.put("/update", controller.update);

router.put("/update-description", controller.setDescription);

router.put("/upload-avatar", upload.any(), controller.uploadAvatar);

router.put("/set-skills", controller.setSkills);

router.put("/set-items", controller.setItems);

module.exports = router;
