const express = require("express");
const multer = require("multer");

const router = express.Router();
const upload = multer();

const logger = require("../logger");
const characterRepo = require("./characterRepository");
const skillRepo = require("./skills/skillRepository");
const itemRepo = require("./items/itemRepository");
const statRepo = require("./statRepository");
const uploader = require("../uploading/uploadService");
const service = require("./characterService")(
  characterRepo,
  skillRepo,
  itemRepo,
  uploader,
  statRepo
);

const controller = require("./characterController")(service, logger);
const eventConsumer = require("./eventConsumer")(service);

eventConsumer.startReceiving();

router.get("/me", controller.findByID);

router.put("/update", controller.update);

router.put("/update-description", controller.setDescription);

router.put("/upload-avatar", upload.any(), controller.uploadAvatar);

router.put("/set-skills", controller.setSkills);

router.put("/set-items", controller.setItems);

router.get("/stats", controller.getStats);

module.exports = router;
