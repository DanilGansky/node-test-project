const eventConsumer = require("./eventConsumer");

eventConsumer.startReceiving();

module.exports = {
  characterAPI: require("./characterAPI"),
};
