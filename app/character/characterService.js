const { appConfig } = require("../config");
const { StatNotFound } = require("./statExceptions");
const { SkillNotFound } = require("./skills/skillExceptions");
const { ItemNotFound } = require("./items/itemExceptions");

let characterRepository;
let skillRepository;
let itemRepository;
let uploadService;
let statRepository;

let availableStats;
let availableSkills;
let availableItems;

const create = async (userID) => {
  const character = await characterRepository.create({
    id: userID,
    UserId: userID,
  });

  await statRepository.createDefaultCharacterStats(character.id);
  return character;
};

const findByID = async (userID) =>
  await characterRepository.findByUserID(userID);

const uploadAvatar = async (data, filename, userID) => {
  const character = await characterRepository.findByUserID(userID);
  const filePath = await uploadService.upload(data, filename);
  const avatarURL = getAvatarURL(filePath);

  await characterRepository.update({ avatar: avatarURL }, character.id);
  return await characterRepository.findByID(character.id);
};

const setDescription = async (description, userID) => {
  const character = await characterRepository.findByUserID(userID);
  await characterRepository.update({ description: description }, character.id);
  return await characterRepository.findByID(character.id);
};

const update = async (data, userID) => {
  const character = await characterRepository.findByUserID(userID);
  const stats = await character.getStats();
  if (!availableStats) {
    availableStats = await statRepository.findAll();
  }

  for (let statKey in data) {
    if (!availableStats.includes(statKey)) {
      return Promise.reject(StatNotFound);
    }

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
  if (!availableSkills) {
    availableSkills = await skillRepository
      .findAll()
      .then((skills) => skills.map((skill) => skill.id));
  }

  if (
    availableSkills.filter((skillID) => skillIDs.includes(skillID)).length !==
    skillIDs.length
  ) {
    return Promise.reject(SkillNotFound);
  }

  const skills = await skillRepository.findByIDs(skillIDs);
  const character = await characterRepository.findByUserID(userID);

  await character.updateAmmunition({ skills: skills, items: character.Items });
  return await characterRepository.findByUserID(userID);
};

const setItems = async (itemIDs, userID) => {
  if (!availableItems) {
    availableItems = await itemRepository
      .findAll()
      .then((items) => items.map((item) => item.id));
  }

  if (
    availableItems.filter((itemID) => itemIDs.includes(itemID)).length !==
    itemIDs.length
  ) {
    return Promise.reject(ItemNotFound);
  }

  const items = await itemRepository.findByIDs(itemIDs);
  const character = await characterRepository.findByUserID(userID);

  await character.updateAmmunition({ items: items, skills: character.Skills });
  return await characterRepository.findByUserID(userID);
};

const getStats = async (userID) => {
  const character = await characterRepository.findByID(userID);
  const statValues = getStatValues(character.Stats);
  const totalValues = getAmmunitionValues(
    [character.Skills, character.Items],
    statValues
  );

  return calcStats(totalValues);
};

const getAvatarURL = (filePath) => {
  const dirs = filePath.split("/");
  return `http://${appConfig.HOST}:${appConfig.PORT}/media/${
    dirs[dirs.length - 1]
  }`;
};

const getAmmunitionValues = (args, values = {}) => {
  for (let ammunition of args) {
    for (let item of ammunition) {
      for (let param of item.Parameters) {
        const statName = param.Stat.name;
        if (values.hasOwnProperty(statName)) {
          values[statName] += param.value;
        } else {
          values[statName] = param.value;
        }
      }
    }
  }

  return values;
};

const getStatValues = (stats, values = {}) => {
  for (let stat of stats) {
    const statName = stat.name;
    if (values.hasOwnProperty(statName)) {
      values[statName] += stat.CharacterStats.value;
    } else {
      values[statName] = stat.CharacterStats.value;
    }
  }

  return values;
};

const calcStats = (values) => {
  values.meleeDamage += Math.floor(values.strength / 2);
  values.rangedDamage += Math.floor(values.agility / 2);
  values.hp += Math.floor(values.endurance / 2);
  values.protection += Math.floor(values.endurance / 5) * 5;
  values.mp += Math.floor(values.intelligence / 2);
  values.damageFromMagic += Math.floor(values.intelligence / 10) * 5;
  return values;
};

module.exports = (characterRepo, skillRepo, itemRepo, uploader, statRepo) => {
  characterRepository = characterRepo;
  skillRepository = skillRepo;
  itemRepository = itemRepo;
  uploadService = uploader;
  statRepository = statRepo;

  return {
    findByID,
    create,
    uploadAvatar,
    setDescription,
    update,
    setSkills,
    setItems,
    getStats,
  };
};
