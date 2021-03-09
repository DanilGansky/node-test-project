const express = require("express");
const multer = require('multer');
const { uploadController } = require("./app/controllers");

const app = express();
const upload = multer();

app.post("/upload", upload.any(), uploadController);

app.listen("3000", () => {
    console.log(`Uploader running on localhost:3000...`);
});