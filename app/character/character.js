const Sequelize = require("sequelize");

class Character extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        avatar: {
          type: DataTypes.STRING,
        },
        description: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "Character",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.user = this.belongsTo(models.User, { onDelete: "cascade" });
    this.skills = this.belongsToMany(models.Skill, {
      through: "CharacterSkills",
      timestamps: false,
    });

    this.items = this.belongsToMany(models.Item, {
      through: "CharacterItems",
      timestamps: false,
    });

    this.stats = this.belongsToMany(models.Stat, {
      through: "CharacterStats",
      foreignKey: "CharacterId",
      timestamps: false,
    });
  }

  async updateAmmunition({ skills, items }) {
    await this.removeSkills();
    await this.removeItems();

    await this.setSkills(skills);
    await this.setItems(items);
  }
}

module.exports = Character;
