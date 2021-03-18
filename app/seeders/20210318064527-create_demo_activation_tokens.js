module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ActivationTokens", [
      {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTU1NDk5MjcsImRhdGEiOiJndWVzdEBtYWlsLmNvbSIsImlhdCI6MTYxNTU0NjMyN30._tePp7lYI4ZEs4WxVcETQ7YS3le0wPdVwod9X4gRXOd",
        UserId: 2,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ActivationTokens", null, {});
  },
};
