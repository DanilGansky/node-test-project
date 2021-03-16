module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CharacterStats", {
      CharacterId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Characters", key: "id" },
        onDelete: "cascade",
      },
      StatId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Stats", key: "id" },
        onDelete: "cascade",
      },
      value: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("CharacterStats");
  },
};
