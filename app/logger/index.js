const mongoose = require("mongoose");
const winston = require("winston");
const { appConfig } = require("../config");
const MongoLogTransport = require("./mongoLogTransport");

(async () =>
  await mongoose.connect(appConfig.LOG_DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }))();

const logger = winston.createLogger({
  transports: [new winston.transports.Console(), new MongoLogTransport()],
});

module.exports = logger;
