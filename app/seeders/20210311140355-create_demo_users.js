module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {
        email: "admin@mail.com",
        password:
          "$2a$10$hsTfGVAO8oCmqwDCfzUnkuuSlxA2DjLCEwAfxx.lKC4jvWmjhEP22",
        isActive: true,
        isAdmin: true,
        registeredAt: new Date(),
        lastLogin: new Date(),
      },
      {
        email: "test@mail.com",
        password:
          "$2a$10$hsTfGVAO8oCmqwDCfzUnkuuSlxA2DjLCEwAfxx.lKC4jvWmjhEP22",
        isActive: true,
        isAdmin: false,
        registeredAt: new Date(),
        lastLogin: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  },
};
