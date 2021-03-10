const express = require("express");
const multer = require("multer");
const {characterController} = require("../controller");

const router = express.Router();
const upload = multer();

router.get("/me", characterController.findByID);

router.put("/update", characterController.updateCharacter);

router.put("/update-description", characterController.setDescription);

router.put("/upload-avatar", upload.any(), characterController.uploadAvatar);

module.exports = router;