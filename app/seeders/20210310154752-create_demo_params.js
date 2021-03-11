module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Parameters", [
      {
        id: 1,
        name: "protection",
        value: 10,
      },
      {
        id: 2,
        name: "agility",
        value: -10,
      },
      {
        id: 3,
        name: "rangedDamage",
        value: 5,
      },
      {
        id: 4,
        name: "meleeDamage",
        value: 15,
      },
      {
        id: 5,
        name: "agility",
        value: -5,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Parameters", null, {});
  },
};
