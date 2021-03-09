require('dotenv').config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRouter = require("./app/identity/routes");
const { appConfig } = require("./app/config");
// const { authMiddleware } = require("./app/middlewares");

const app = express();
const corsOptions = {
    origin: `http://localhost${appConfig.PORT}`
};

// Middlewares
app.use(cors(corsOptions));
app.use(bodyParser.json());

// Routers
app.use("/auth", authRouter);

app.listen(appConfig.PORT, () => {
    console.log(`Running on localhost:${appConfig.PORT}...`);
});