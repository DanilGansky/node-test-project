module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CharacterItems', {
      CharacterId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      ItemId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CharacterItems');
  }
};