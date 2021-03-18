module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Skills", [
      {
        name: "Stone skin",
      },
      {
        name: "Keen eye",
      },
      {
        name: "Strongman",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Skills", null, {});
  },
};
