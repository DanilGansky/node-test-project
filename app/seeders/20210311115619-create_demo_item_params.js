module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ItemParams", [
      {
        ItemId: 1,
        ParameterId: 6,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ItemParams", null, {});
  },
};
