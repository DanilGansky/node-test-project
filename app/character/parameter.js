const Sequelize = require("sequelize");

class Parameter extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        value: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        modelName: "Parameter",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.skills = this.belongsToMany(models.Skill, {
      through: "SkillParams",
      timestamps: false,
    });
    this.items = this.belongsToMany(models.Item, {
      through: "ItemParams",
      timestamps: false,
    });
  }
}

module.exports = Parameter;
