module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Parameters", [
      {
        name: "protection",
        value: 10,
      },
      {
        name: "agility",
        value: -10,
      },
      {
        name: "rangedDamage",
        value: 5,
      },
      {
        name: "meleeDamage",
        value: 15,
      },
      {
        name: "agility",
        value: -5,
      },
      {
        name: "rangedDamage",
        value: 50,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Parameters", null, {});
  },
};
