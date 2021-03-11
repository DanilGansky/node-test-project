const characterRepository = require("./characterRepository");
const skillRepository = require("./skills/skillRepository");
const itemRepository = require("./items/itemRepository");
const { uploadService } = require("../uploading");
const { appConfig } = require("../config");

const create = async (userID) =>
  await characterRepository.create({ UserId: userID });

const findByID = async (userID) =>
  await characterRepository.findByUserID(userID);

const findAllSkills = async () => await skillRepository.findAll();

const findAllItems = async () => await itemRepository.findAll();

const uploadAvatar = async (data, filename, userID) => {
  const character = await characterRepository.findByUserID(userID);
  const filePath = await uploadService.upload(data, filename);
  const avatarURL = getAvatarURL(filePath);
  await characterRepository.update({ avatar: avatarURL }, character.id);
  return avatarURL;
};

const setDescription = async (description, userID) => {
  const character = await characterRepository.findByUserID(userID);
  await characterRepository.update({ description: description }, character.id);
  return await characterRepository.findByUserID(character.id);
};

const update = async (data, userID) => {
  const character = await characterRepository.findByUserID(userID);
  if (data.strength) {
    character.strength = data.strength;
  }
  if (data.agility) {
    character.agility = data.agility;
  }
  if (data.endurance) {
    character.endurance = data.endurance;
  }
  if (data.intelligence) {
    character.intelligence = data.intelligence;
  }

  character.updateStats({ skills: character.Skills, items: character.Items });
  await characterRepository.update(character.dataValues, character.id);
  return await characterRepository.findByUserID(userID);
};

const setSkills = async (skillIDs, userID) => {
  const skills = await skillRepository.findByIDs(skillIDs);
  const character = await characterRepository.findByUserID(userID);

  await character.updateStats({ skills: skills, items: character.Items });
  await characterRepository.update(character.dataValues, character.id);
  return await characterRepository.findByUserID(userID);
};

const setItems = async (itemIDs, userID) => {
  const items = await itemRepository.findByIDs(itemIDs);
  const character = await characterRepository.findByUserID(userID);

  await character.updateStats({ items: items, skills: character.Skills });
  await characterRepository.update(character.dataValues, character.id);
  return await characterRepository.findByUserID(userID);
};

const getAvatarURL = (filePath) => {
  const dirs = filePath.split("/");
  return `http://${appConfig.HOST}:${appConfig.PORT}/media/${
    dirs[dirs.length - 1]
  }`;
};

module.exports = {
  findByID,
  findAllSkills,
  findAllItems,
  create,
  uploadAvatar,
  setDescription,
  update,
  setSkills,
  setItems,
};
