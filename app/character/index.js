const eventConsumer = require("./eventConsumer");

eventConsumer.startReceiving();

module.exports = {
  characterAPI: require("./characterAPI"),
  adminAPI: require("./admin/adminAPI"),
};
