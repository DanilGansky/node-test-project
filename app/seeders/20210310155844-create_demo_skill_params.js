module.exports = {
    up: async (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert("SkillParams", [{
            SkillId: 1,
            ParameterId: 1,
        }, {
            SkillId: 1,
            ParameterId: 2,
        }, {
            SkillId: 2,
            ParameterId: 3,
        }, {
            SkillId: 3,
            ParameterId: 4,
        }, {
            SkillId: 3,
            ParameterId: 5,
        },]);
    },

    down: async (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete("SkillParams", null, {});
    }
};
