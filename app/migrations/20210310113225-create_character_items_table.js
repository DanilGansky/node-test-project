module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CharacterItems", {
      CharacterId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Characters", key: "id" },
        onDelete: "cascade",
      },
      ItemId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Items", key: "id" },
        onDelete: "cascade",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("CharacterItems");
  },
};
