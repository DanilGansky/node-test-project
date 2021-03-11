module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Items", [
      {
        id: 1,
        name: "Bow",
        icon:
          "https://assets.leevalley.com/Size4/10026/05N5520-asymmetric-drawing-bow-f-37.jpg",
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Items", null, {});
  },
};
