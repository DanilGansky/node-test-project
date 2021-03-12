const { appConfig } = require("../config");

let repository;

// todo: make mocks
if (appConfig.TEST) {
} else {
  repository = require("../identity/activation/accessTokenRepository");
}

module.exports = {
  authMiddleware: require("./authMiddleware")(repository),
  isAdminMiddleware: require("./isAdminMiddleware"),
};
