module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("SkillParams", {
      SkillId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Skills", key: "id" },
        onDelete: "cascade",
      },
      ParameterId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
        references: { model: "Parameters", key: "id" },
        onDelete: "cascade",
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("SkillParams");
  },
};
