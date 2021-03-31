module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("AccessTokens", [
      {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdEBtYWlsLmNvbSIsImlhdCI6MTYxNzAyOTMyNn0.tw0u3h9A1UZETKZBZTGKgYUGrj7ef_GSY22YIIVcq6I",
        isBlocked: false,
        UserId: 2,
      },
      {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE2MTcwMjkzNzV9.ch_DcjTpR-aaUOX0fMScBxT1hMMqZxkBexIDGgpfNlM",
        isBlocked: false,
        UserId: 1,
      },
      {
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE2MTcxNzM2NTF9.m7MP5-GDjy_Kvw99Nv613BNC86QSpdulUakaz_8senc",
        isBlocked: false,
        UserId: 1,
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("AccessTokens", null, {});
  },
};
