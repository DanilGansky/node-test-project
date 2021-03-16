const Sequelize = require("sequelize");

class CharacterStats extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        value: {
          type: DataTypes.INTEGER,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        modelName: "CharacterStats",
        timestamps: false,
      }
    );
  }
}

module.exports = CharacterStats;
