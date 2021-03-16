module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Parameters", [
      {
        StatId: 7,
        value: 10,
      },
      {
        StatId: 2,
        value: -10,
      },
      {
        StatId: 6,
        value: 5,
      },
      {
        StatId: 5,
        value: 15,
      },
      {
        StatId: 2,
        value: -5,
      },
      {
        StatId: 6,
        value: 50,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Parameters", null, {});
  },
};
