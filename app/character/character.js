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
        strength: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        agility: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        endurance: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        intelligence: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
        meleeDamage: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 5,
        },
        rangedDamage: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 5,
        },
        protection: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 5,
        },
        damageFromMagic: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 2,
        },
        hp: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 100,
        },
        mp: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 100,
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
  }

  async updateStats({ skills, items }) {
    this.clearStats();
    await this.removeSkills();
    await this.removeItems();

    await this.setSkills(skills);
    await this.setItems(items);

    if (skills) {
      await this._updateStatsFromAmmunition(skills);
    }
    if (items) {
      await this._updateStatsFromAmmunition(items);
    }
  }

  async _updateStatsFromAmmunition(ammunition) {
    for (let val of ammunition) {
      const params = await val.getParameters();
      for (let p of params) {
        this[p.name] += p.value;
      }
    }
  }

  calcStats() {
    this.meleeDamage += Math.floor(this.strength / 2);
    this.rangedDamage += Math.floor(this.agility / 2);
    this.hp += Math.floor(this.endurance / 2);
    this.protection += Math.floor(this.endurance / 5) * 5;
    this.mp += Math.floor(this.intelligence / 2);
    this.damageFromMagic += Math.floor(this.intelligence / 10) * 5;
  }

  clearStats() {
    this.strength = 0;
    this.agility = 0;
    this.endurance = 0;
    this.intelligence = 0;
    this.meleeDamage = 0;
    this.rangedDamage = 0;
    this.protection = 0;
    this.damageFromMagic = 0;
    this.hp = 0;
    this.mp = 0;
  }
}

module.exports = Character;
