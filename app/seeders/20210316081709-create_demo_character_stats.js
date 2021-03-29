module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("CharacterStats", [
      {
        CharacterId: 2,
        StatId: 1,
        value: 5,
      },
      {
        CharacterId: 2,
        StatId: 2,
        value: 5,
      },
      {
        CharacterId: 2,
        StatId: 3,
        value: 5,
      },
      {
        CharacterId: 2,
        StatId: 4,
        value: 5,
      },
      {
        CharacterId: 2,
        StatId: 5,
        value: 5,
      },
      {
        CharacterId: 2,
        StatId: 6,
        value: 5,
      },
      {
        CharacterId: 2,
        StatId: 7,
        value: 5,
      },
      {
        CharacterId: 2,
        StatId: 8,
        value: 5,
      },
      {
        CharacterId: 2,
        StatId: 9,
        value: 5,
      },
      {
        CharacterId: 2,
        StatId: 10,
        value: 5,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("CharacterStats", null, {});
  },
};
