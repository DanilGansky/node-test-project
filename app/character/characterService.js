const { appConfig } = require("../config");

let characterRepository;
let skillRepository;
let itemRepository;
let uploadService;
let statRepository;

const create = async (userID) =>
  await characterRepository.create({ UserId: userID });

const findByID = async (userID) => {
  const character = await characterRepository.findByUserID(userID);
  const stats = await calcStats(character);
  return { character, stats };
};

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

const calcStats = async (character) => {
  const totalStats = {};
  if (character.Skills) {
    await updateStatsFromAmmunition(character.Skills, totalStats);
  }
  if (character.Items) {
    await updateStatsFromAmmunition(character.Items, totalStats);
  }

  for (let stat of character.Stats) {
    switch (stat.name) {
      case "strength":
        if (stat.CharacterStats.value > 0) {
          if (totalStats.hasOwnProperty("meleeDamage")) {
            totalStats.meleeDamage += Math.floor(stat.CharacterStats.value / 2);
          } else {
            totalStats.meleeDamage = Math.floor(stat.CharacterStats.value / 2);
          }
        }
        break;
      case "agility":
        if (stat.CharacterStats.value > 0) {
          if (totalStats.hasOwnProperty("rangedDamage")) {
            totalStats.rangedDamage += Math.floor(
              stat.CharacterStats.value / 2
            );
          } else {
            totalStats.rangedDamage = Math.floor(stat.CharacterStats.value / 2);
          }
        }
        break;
      case "endurance":
        if (stat.CharacterStats.value > 0) {
          if (totalStats.hasOwnProperty("hp")) {
            totalStats.hp += Math.floor(stat.CharacterStats.value / 2);
          } else {
            totalStats.hp = Math.floor(stat.CharacterStats.value / 2);
          }

          if (totalStats.hasOwnProperty("protection")) {
            totalStats.protection +=
              Math.floor(stat.CharacterStats.value / 5) * 5;
          } else {
            totalStats.protection =
              Math.floor(stat.CharacterStats.value / 5) * 5;
          }
        }
        break;
      case "intelligence":
        if (stat.CharacterStats.value > 0) {
          if (totalStats.hasOwnProperty("mp")) {
            totalStats.mp += Math.floor(stat.CharacterStats.value / 2);
          } else {
            totalStats.mp = Math.floor(stat.CharacterStats.value / 2);
          }

          if (totalStats.hasOwnProperty("damageFromMagic")) {
            totalStats.damageFromMagic +=
              Math.floor(stat.CharacterStats.value / 10) * 5;
          } else {
            totalStats.damageFromMagic =
              Math.floor(stat.CharacterStats.value / 10) * 5;
          }
        }
        break;
    }
  }

  return totalStats;
};

const updateStatsFromAmmunition = async (ammunition, stats) => {
  for (let val of ammunition) {
    const params = await val.getParameters();
    for (let p of params) {
      const stat = await statRepository.findByID(p.StatId);
      if (stats[stat.name]) {
        stats[stat.name] += p.value;
      } else {
        stats[stat.name] = p.value;
      }
    }
  }
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
  };
};
