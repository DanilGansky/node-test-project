const express = require("express");
const multer = require("multer");

const router = express.Router();
const repository = require("./itemRepository");
const { uploadService } = require("../../uploading");
const service = require("./itemService")(repository, uploadService);
const logger = require("../../logger");
const controller = require("./itemController")(service, logger);
const upload = multer();

router.get("/items", controller.findAll);

router.post("/items", controller.create);

router.put("/items/:id", controller.update);

router.put("/items/:id/upload-icon", upload.any(), controller.uploadIcon);

router.delete("/items/:id", controller.remove);

module.exports = router;
