module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Characters', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      avatar: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      strength: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      agility: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      endurance: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      intelligence: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      meleeDamage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
      rangedDamage: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
      protection: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 5,
      },
      damageFromMagic: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 2,
      },
      hp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100,
      },
      mp: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100,
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
    await queryInterface.dropTable('Characters');
  }
};