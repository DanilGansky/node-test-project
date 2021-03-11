const express = require("express");
const multer = require("multer");
const characterController = require("./characterController");

const router = express.Router();
const upload = multer();

router.get("/me", characterController.findByID);

router.get("/skills", characterController.findAllSkills);

router.get("/items", characterController.findAllItems);

router.put("/update", characterController.update);

router.put("/update-description", characterController.setDescription);

router.put("/upload-avatar", upload.any(), characterController.uploadAvatar);

router.put("/set-skills", characterController.setSkills);

router.put("/set-items", characterController.setItems);

module.exports = router;
