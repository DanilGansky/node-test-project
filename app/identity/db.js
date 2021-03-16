const User = require("./users/user");
const dbConfig = require("../config/dbConfig");
const AccessToken = require("./activation/accessToken");
const ActivationCode = require("./activation/activationCode");
const ActivationToken = require("./activation/activationToken");
const { Sequelize } = require("sequelize");

const models = {
  User: User.init(dbConfig.sequelize, Sequelize),
  AccessToken: AccessToken.init(dbConfig.sequelize, Sequelize),
  ActivationCode: ActivationCode.init(dbConfig.sequelize, Sequelize),
  ActivationToken: ActivationToken.init(dbConfig.sequelize, Sequelize),
};

AccessToken.associate(models);
ActivationCode.associate(models);
ActivationToken.associate(models);

const db = {
  sequelize: dbConfig.sequelize,
  ...models,
};

module.exports = db;
