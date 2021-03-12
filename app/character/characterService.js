const { appConfig } = require("../config");

let characterRepository;
let skillRepository;
let itemRepository;
let uploadService;

const create = async (userID) =>
  await characterRepository.create({ UserId: userID });

const findByID = async (userID) =>
  await characterRepository.findByUserID(userID);

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
  return await characterRepository.findByID(character.id);
};

const update = async (data, userID) => {
  const character = await characterRepository.findByUserID(userID);
  await character.updateStats({
    skills: character.Skills,
    items: character.Items,
  });

  if (data.strength) {
    character.strength += data.strength;
  }
  if (data.agility) {
    character.agility += data.agility;
  }
  if (data.endurance) {
    character.endurance += data.endurance;
  }
  if (data.intelligence) {
    character.intelligence += data.intelligence;
  }

  character.calcStats();
  await characterRepository.update(character.dataValues, character.id);
  return await characterRepository.findByUserID(userID);
};

const setSkills = async (skillIDs, userID) => {
  const skills = await skillRepository.findByIDs(skillIDs);
  const character = await characterRepository.findByUserID(userID);

  await character.updateStats({ skills: skills, items: character.Items });
  character.calcStats();

  await characterRepository.update(character.dataValues, character.id);
  return await characterRepository.findByUserID(userID);
};

const setItems = async (itemIDs, userID) => {
  const items = await itemRepository.findByIDs(itemIDs);
  const character = await characterRepository.findByUserID(userID);

  await character.updateStats({ items: items, skills: character.Skills });
  character.calcStats();

  await characterRepository.update(character.dataValues, character.id);
  return await characterRepository.findByUserID(userID);
};

const getAvatarURL = (filePath) => {
  const dirs = filePath.split("/");
  return `http://${appConfig.HOST}:${appConfig.PORT}/media/${
    dirs[dirs.length - 1]
  }`;
};

module.exports = (characterRepo, skillRepo, itemRepo, uploader) => {
  characterRepository = characterRepo;
  skillRepository = skillRepo;
  itemRepository = itemRepo;
  uploadService = uploader;

  return {
    findByID,
    create,
    uploadAvatar,
    setDescription,
    update,
    setSkills,
    setItems,
  };
};
