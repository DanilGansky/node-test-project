const Sequelize = require("sequelize");

class ActivationCode extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            code: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "ActivationCode",
            timestamps: false,
        });
    }

    static associate(models) {
        this.user = this.belongsTo(models.User, {
            onDelete: "cascade",
        });
    }
}

module.exports = ActivationCode;