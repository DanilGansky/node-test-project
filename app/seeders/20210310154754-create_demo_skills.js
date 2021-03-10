module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("Skills", [{
            id: 1,
            name: "Stone skin",
        }, {
            id: 2,
            name: "Keen eye",
        }, {
            id: 3,
            name: "Strongman",
        }]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("Skills", null, {});
    }
};
