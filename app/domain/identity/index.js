const Sequelize = require("sequelize");
const User = require("./user");
const AccessToken = require("./accessToken");
const ActivationToken = require("./activationToken");
const ActivationCode = require("./activationCode");
const {dbConfig} = require("../../config");

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