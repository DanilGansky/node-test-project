module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("ActivationTokens", [
      {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE2MTcwMjkzNzV9.ch_DcjTpR-aaUOX0fMScBxT1hMMqZxkBexIDGgpfNlM",
        UserId: 1,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("ActivationTokens", null, {});
  },
};
