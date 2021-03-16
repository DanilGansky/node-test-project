const result = require("dotenv").config({ path: "../.env" });
if (result.error) {
  console.error("dotenv: " + result.error);
}

const addr = process.env.DBADDR.split(":");
const host = addr[0];

module.exports = {
  development: {
    username: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DBNAME,
    host: host,
    dialect: "postgres",
    operatorsAliases: false,
    define: {
      timestamps: false,
    },
  },
};
