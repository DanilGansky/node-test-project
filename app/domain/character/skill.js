const Sequelize = require("sequelize");

class Skill extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "Skill",
            timestamps: false,
        });
    }

    static associate(models) {
        this.characters = this.belongsToMany(models.Character, {through: "CharacterSkills"});
        this.params = this.belongsToMany(models.Parameter, {through: "SkillParams"});
    }
}

module.exports = Skill;