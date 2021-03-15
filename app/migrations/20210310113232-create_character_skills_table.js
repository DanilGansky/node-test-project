module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CharacterSkills", {
      CharacterId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Characters", key: "id" },
        onDelete: "cascade",
      },
      SkillId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Skills", key: "id" },
        onDelete: "cascade",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("CharacterSkills");
  },
};
