const { toSkillsResponse } = require("./skills/skillMapper");
const { toItemsResponse } = require("./items/itemMapper");
const { toUserResponse } = require("../identity/userMapper");
const toStatsResponse = (stats) => {
  const resp = {};
  for (let stat of stats) {
    resp[stat.name] = stat.CharacterStats.value;
  }
  return resp;
};

const toCharacterResponse = (character) => {
  return {
    id: character.id,
    avatar: character.avatar,
    description: character.description,
    skills: toSkillsResponse(character.Skills),
    items: toItemsResponse(character.Items),
    user: toUserResponse(character.User),
    stats: toStatsResponse(character.Stats),
  };
};

const toCharactersResponse = (characters) =>
  characters.map(toCharacterResponse);

module.exports = {
  toStatsResponse,
  toCharacterResponse,
  toCharactersResponse,
};
