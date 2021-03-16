const Sequelize = require("sequelize");

class Stat extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Stat",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.characters = this.belongsToMany(models.Character, {
      through: "CharacterStats",
      foreignKey: "StatId",
      timestamps: false,
    });
  }
}

module.exports = Stat;
