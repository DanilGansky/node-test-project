const characterExceptions = require("./characterExceptions");
const db = require("./db");

const findAll = async () =>
  await db.Character.findAll({
    include: [
      {
        model: db.Skill,
        include: {
          model: db.Parameter,
          through: { attributes: [] },
          include: {
            model: db.Stat,
            order: [["id", "ASC"]],
          },
          order: [["id", "ASC"]],
        },
        through: { attributes: [] },
        order: [["id", "ASC"]],
      },
      {
        model: db.Item,
        include: {
          model: db.Parameter,
          through: { attributes: [] },
          include: {
            model: db.Stat,
            order: [["id", "ASC"]],
          },
          order: [["id", "ASC"]],
        },
        through: { attributes: [] },
        order: [["id", "ASC"]],
      },
      { model: db.User, order: [["id", "ASC"]] },
      { model: db.Stat, order: [["id", "ASC"]] },
    ],
  });

const findByID = async (id) => {
  const character = await db.Character.findOne({
    where: { id: id },
    include: [
      {
        model: db.Skill,
        include: {
          model: db.Parameter,
          through: { attributes: [] },
          include: {
            model: db.Stat,
            order: [["id", "ASC"]],
          },
          order: [["id", "ASC"]],
        },
        through: { attributes: [] },
        order: [["id", "ASC"]],
      },
      {
        model: db.Item,
        include: {
          model: db.Parameter,
          through: { attributes: [] },
          include: {
            model: db.Stat,
            order: [["id", "ASC"]],
          },
          order: [["id", "ASC"]],
        },
        through: { attributes: [] },
        order: [["id", "ASC"]],
      },
      { model: db.User, order: [["id", "ASC"]] },
      { model: db.Stat, order: [["id", "ASC"]] },
    ],
  });

  if (!character) {
    return Promise.reject(characterExceptions.CharacterNotFound);
  }
  return character;
};

const findByUserID = async (userID) => {
  const character = await db.Character.findOne({
    where: { UserId: userID },
    include: [
      {
        model: db.Skill,
        include: {
          model: db.Parameter,
          through: { attributes: [] },
          include: {
            model: db.Stat,
            order: [["id", "ASC"]],
          },
          order: [["id", "ASC"]],
        },
        through: { attributes: [] },
        order: [["id", "ASC"]],
      },
      {
        model: db.Item,
        include: {
          model: db.Parameter,
          through: { attributes: [] },
          include: {
            model: db.Stat,
            order: [["id", "ASC"]],
          },
          order: [["id", "ASC"]],
        },
        through: { attributes: [] },
        order: [["id", "ASC"]],
      },
      { model: db.User, order: [["id", "ASC"]] },
      { model: db.Stat, order: [["id", "ASC"]] },
    ],
  });

  if (!character) {
    return Promise.reject(characterExceptions.CharacterNotFound);
  }
  return character;
};

const create = (data) => {
  return db.Character.create(data);
};

const update = (data, id) => {
  return db.Character.update(data, {
    where: { id: id },
  });
};

const findCharacterStat = (statID, characterID) => {
  return db.CharacterStats.findOne({
    where: {
      StatId: statID,
      CharacterId: characterID,
    },
  });
};

module.exports = {
  findAll,
  findByUserID,
  findByID,
  create,
  update,
  findCharacterStat,
};
