const Sequelize = require("sequelize");

class ActivationToken extends Sequelize.Model {
    static init(sequelize, DataTypes) {
        return super.init({
            token: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: "ActivationToken",
            timestamps: false,
        });
    }

    static associate(models) {
        this.user = this.belongsTo(models.User, {
            onDelete: "cascade",
        });
    }
}

module.exports = ActivationToken;