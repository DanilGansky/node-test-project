const eventConsumer = require("./eventConsumer");

eventConsumer.startReceiving();

module.exports = {
  characterAPI: require("./characterAPI"),
  adminCharacterAPI: require("./admin/adminAPI"),
  adminSkillAPI: require("./skills/skillAPI"),
  adminItemAPI: require("./items/itemAPI"),
};
