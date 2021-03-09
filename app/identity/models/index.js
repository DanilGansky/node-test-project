const Sequelize = require("sequelize");
const { dbConfig } = require("../../config");
const User = require("./user");
const AccessToken = require("./accessToken");
const ActivationToken = require("./activationToken");
const ActivationCode = require("./activationCode");

const sequelize = new Sequelize(`postgres://${dbConfig.USER}:${dbConfig.PASS}@${dbConfig.ADDR}/${dbConfig.NAME}`);

const models = {
    User: User.init(sequelize, Sequelize),
    AccessToken: AccessToken.init(sequelize, Sequelize),
    ActivationCode: ActivationCode.init(sequelize, Sequelize),
    ActivationToken: ActivationToken.init(sequelize, Sequelize),
};

AccessToken.associate(models);
ActivationCode.associate(models);
ActivationToken.associate(models);

const db = {
    sequelize: sequelize,
    ...models,
};

module.exports = db;