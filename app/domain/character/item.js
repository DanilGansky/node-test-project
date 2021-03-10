const Sequelize = require("sequelize");

class Item extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            icon: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Item",
            timestamps: false,
        });
    }

    static associate(models) {
        this.characters = this.belongsToMany(models.Character, {through: "CharacterItems"});
        this.params = this.belongsToMany(models.Parameter, {through: "ItemParams"});
    }
}

module.exports = Item;