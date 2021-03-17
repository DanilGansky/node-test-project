const Sequelize = require("sequelize");

class AccessToken extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        token: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        isBlocked: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
        },
        isTest: {
          type: DataTypes.BOOLEAN,
          allowNull: false,
          defaultValue: false,
        },
      },
      {
        sequelize,
        modelName: "AccessToken",
        timestamps: false,
      }
    );
  }

  static associate(models) {
    this.user = this.belongsTo(models.User, {
      onDelete: "cascade",
    });
  }
}

module.exports = AccessToken;
