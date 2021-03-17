const Sequelize = require("sequelize");

const config = {
  USER: process.env.DBUSER,
  PASS: process.env.DBPASS,
  NAME: process.env.DBNAME,
  ADDR: process.env.TEST ? process.env.TEST_DBADDR : process.env.DBADDR,
};

const sequelize = new Sequelize(
  `postgres://${config.USER}:${config.PASS}@${config.ADDR}/${config.NAME}`
);

module.exports = {
  config: config,
  sequelize: sequelize,
};
