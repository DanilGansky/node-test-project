require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { identityAPI, publicAPI } = require("./app/identity");
const {
  characterAPI,
  adminCharacterAPI,
  adminSkillAPI,
  adminItemAPI,
} = require("./app/character");

const fs = require("fs");
const { appConfig } = require("./app/config");
const { authMiddleware, isAdminMiddleware } = require("./app/middlewares");

const app = express();
const corsOptions = {
  origin: `http://${appConfig.HOST}:${appConfig.PORT}`,
};

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routers
app.use("/identity", identityAPI, publicAPI);
app.use(
  "/admin",
  authMiddleware,
  isAdminMiddleware,
  adminCharacterAPI,
  adminSkillAPI,
  adminItemAPI
);

app.use("/character", authMiddleware, characterAPI);

app.use("/media", (req, resp) => {
  fs.readFile(__dirname + "/media/" + req.url, (err, text) => {
    if (err) {
      resp.status(404);
      resp.end(JSON.stringify(err));
      console.log(err);
    }

    resp.status(200);
    resp.end(text);
  });
});

module.exports = app;
