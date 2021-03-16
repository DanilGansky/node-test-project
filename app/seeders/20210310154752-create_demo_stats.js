module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Stats", [
      {
        name: "strength",
      },
      {
        name: "agility",
      },
      {
        name: "endurance",
      },
      {
        name: "intelligence",
      },
      {
        name: "meleeDamage",
      },
      {
        name: "rangedDamage",
      },
      {
        name: "protection",
      },
      {
        name: "damageFromMagic",
      },
      {
        name: "hp",
      },
      {
        name: "mp",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Stats", null, {});
  },
};
