const express = require("express");
const multer = require("multer");
const {characterController} = require("../controller");

const router = express.Router();
const upload = multer();

router.put("/upload-description", characterController.setDescription);

router.put("/upload-avatar", upload.any(), characterController.uploadAvatar);

module.exports = router;