require("dotenv").config({ path: "../.env" });

const addr = (process.env.TEST === "true"
  ? process.env.TEST_DBADDR
  : process.env.DBADDR
).split(":");

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
