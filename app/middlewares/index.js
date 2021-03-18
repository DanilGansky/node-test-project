const repository = require("../identity/activation/accessTokenRepository");

module.exports = {
  authMiddleware: require("./authMiddleware")(repository),
  isAdminMiddleware: require("./isAdminMiddleware"),
};
