module.exports = {
  SALT: process.env.SALT,
  SECRET: process.env.SECRET,
  HOST: process.env.HOST,
  PORT: process.env.PORT,
  RABBIT_URL: process.env.RABBIT_URL,
  TEST: process.env.TEST !== "false",
  LOG_DB_URL: process.env.LOG_DB_URL,
};
