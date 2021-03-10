require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./app/identity/routes");
const fs = require("fs");
const {appConfig} = require("./app/config");
// const { authMiddleware } = require("./app/middlewares");

const app = express();
const corsOptions = {
    origin: `http://${appConfig.HOST}:${appConfig.PORT}`
};

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routers
app.use("/identity", authRoutes.api, authRoutes.html);

app.listen(appConfig.PORT, () => {
    console.log(`Running on ${appConfig.HOST}:${appConfig.PORT}...`);
});