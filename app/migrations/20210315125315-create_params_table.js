module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Parameters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      value: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      StatId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Stats", key: "id" },
        onDelete: "cascade",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Parameters");
  },
};
