module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Characters", [
      {
        id: 2,
        avatar: "",
        description: "test character",
        UserId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Characters", null, {});
  },
};
