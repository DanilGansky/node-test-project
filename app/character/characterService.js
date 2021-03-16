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
  const stats = await character.getStats();

  for (let statKey in data) {
    for (let stat of stats) {
      if (stat.name === statKey) {
        const characterStat = await characterRepository.findCharacterStat(
          stat.id,
          character.id
        );

        characterStat.value = data[statKey];
        await characterStat.save();
      }
    }
  }

  return await characterRepository.findByUserID(userID);
};

const setSkills = async (skillIDs, userID) => {
  const skills = await skillRepository.findByIDs(skillIDs);
  const character = await characterRepository.findByUserID(userID);

  await character.updateAmmunition({ skills: skills, items: character.Items });
  return await characterRepository.findByUserID(userID);
};

const setItems = async (itemIDs, userID) => {
  const items = await itemRepository.findByIDs(itemIDs);
  const character = await characterRepository.findByUserID(userID);

  await character.updateAmmunition({ items: items, skills: character.Skills });
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
