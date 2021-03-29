const db = require("./db");

const findAll = () =>
  db.Stat.findAll({ attributes: ["name"] }).then((stats) =>
    stats.map((stat) => stat.name)
  );

const findByID = (statID) => db.Stat.findOne({ where: { id: statID } });

const createDefaultCharacterStats = (characterID) => {
  return db.CharacterStats.bulkCreate([
    {
      CharacterId: characterID,
      StatId: 1,
      value: 5,
    },
    {
      CharacterId: characterID,
      StatId: 2,
      value: 5,
    },
    {
      CharacterId: characterID,
      StatId: 3,
      value: 5,
    },
    {
      CharacterId: characterID,
      StatId: 4,
      value: 5,
    },
    {
      CharacterId: characterID,
      StatId: 5,
      value: 5,
    },
    {
      CharacterId: characterID,
      StatId: 6,
      value: 5,
    },
    {
      CharacterId: characterID,
      StatId: 7,
      value: 5,
    },
    {
      CharacterId: characterID,
      StatId: 8,
      value: 5,
    },
    {
      CharacterId: characterID,
      StatId: 9,
      value: 5,
    },
    {
      CharacterId: characterID,
      StatId: 10,
      value: 5,
    },
  ]);
};

module.exports = {
  findByID,
  findAll,
  createDefaultCharacterStats,
};
