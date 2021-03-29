const Sequelize = require("sequelize");

class Item extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        name: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        icon: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        modelName: "Item",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.characters = this.belongsToMany(models.Character, {
      through: "CharacterItems",
      timestamps: false,
    });

    this.params = this.belongsToMany(models.Parameter, {
      through: "ItemParams",
      timestamps: false,
      onDelete: "cascade",
    });
  }
}

module.exports = Item;
