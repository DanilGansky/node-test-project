module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            registeredAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.NOW,
            },
            isActive: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            // AccessTokenId: {
            //     allowNull: false,
            //     type: Sequelize.INTEGER,
            //     references: { model: "AccessTokens", key: "id" },
            // },
            // ActivationCodeId: {
            //     allowNull: false,
            //     type: Sequelize.INTEGER,
            //     references: { model: "ActivationCodes", key: "id" },
            // },
            // ActivationTokenId: {
            //     allowNull: false,
            //     type: Sequelize.INTEGER,
            //     references: { model: "ActivationTokens", key: "id" },
            // },
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Users');
    }
};