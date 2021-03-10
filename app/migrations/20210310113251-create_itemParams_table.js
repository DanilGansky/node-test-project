module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ItemParams', {
      ItemId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ParameterId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ItemParams');
  }
};