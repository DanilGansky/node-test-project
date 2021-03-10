module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('CharacterSkills', {
      CharacterId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      SkillId: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER,
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('CharacterSkills');
  }
};