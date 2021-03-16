module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ActivationCodes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      UserId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
        onDelete: "cascade",
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ActivationCodes');
  }
};