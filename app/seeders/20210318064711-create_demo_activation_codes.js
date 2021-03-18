module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ActivationCodes", [
      {
        code: 123456,
        UserId: 1,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ActivationCodes", null, {});
  },
};
