const result = require("dotenv").config();
if (result.error) {
  console.error("dotenv: " + result.error);
}

module.exports = {
  emailSenderConfig: require("./emailSenderConfig"),
  smsSenderConfig: require("./smsSenderConfig"),
  dbConfig: require("./dbConfig"),
  appConfig: require("./appConfig"),
  sequelizeConfig: require("./sequelizeConfig.js"),
};
