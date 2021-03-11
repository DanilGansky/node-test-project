const Sequelize = require("sequelize");
const Character = require("./character");
const Item = require("./item");
const Skill = require("./skill");
const Parameter = require("./parameter");
const { dbConfig } = require("../config");
const identityModels = require("../identity/db");

const models = {
  User: identityModels.User,
  Character: Character.init(dbConfig.sequelize, Sequelize),
  Item: Item.init(dbConfig.sequelize, Sequelize),
  Skill: Skill.init(dbConfig.sequelize, Sequelize),
  Parameter: Parameter.init(dbConfig.sequelize, Sequelize),
};

Character.associate(models);
Item.associate(models);
Skill.associate(models);
Parameter.associate(models);

const db = {
  sequelize: dbConfig.sequelize,
  ...models,
};

module.exports = db;
