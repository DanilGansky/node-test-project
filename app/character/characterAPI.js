const express = require("express");
const multer = require("multer");
const { appConfig } = require("../config");

const router = express.Router();
const upload = multer();

let characterRepo;
let skillRepo;
let itemRepo;

let service;
let controller;

let uploader;
let eventConsumer;

// todo: make mocks
if (appConfig.TEST) {
} else {
  characterRepo = require("./characterRepository");
  skillRepo = require("./skills/skillRepository");
  itemRepo = require("./items/itemRepository");
  uploader = require("../uploading/uploadService");
  service = require("./characterService")(
    characterRepo,
    skillRepo,
    itemRepo,
    uploader
  );

  controller = require("./characterController")(service);
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
