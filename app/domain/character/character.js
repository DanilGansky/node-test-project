const Sequelize = require("sequelize");

class Character extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
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
        }, {
            sequelize,
            modelName: "Character",
            timestamps: false,
        });
    }

    static associate(models) {
        this.user = this.belongsTo(models.User, {onDelete: 'cascade'});
        this.skills = this.belongsToMany(models.Skill, {through: "CharacterSkills"});
        this.items = this.belongsToMany(models.Item, {through: "CharacterItems"});
    }
}

module.exports = Character;