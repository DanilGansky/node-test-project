require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./app/webApi/identity/routes");
const characterRoutes = require("./app/webApi/character/routes");
const fs = require("fs");
const {appConfig} = require("./app/config");
const {authMiddleware} = require("./app/webApi/middlewares");

const app = express();
const corsOptions = {
    origin: `http://${appConfig.HOST}:${appConfig.PORT}`
};

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routers
app.use("/identity", authRoutes.api, authRoutes.html);
app.use("/character", authMiddleware, characterRoutes.characterRoutes);
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

app.listen(appConfig.PORT, () => {
    console.log(`Running on ${appConfig.HOST}:${appConfig.PORT}...`);
});