module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Characters", [
      {
        avatar: "",
        description: "admin character",
        UserId: 1,
      },
      {
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
