module.exports = {
  findUserByToken: (token) => {
    return {
      id: 123,
      email: "test@mail.com",
      password: "$2a$10$hsTfGVAO8oCmqwDCfzUnkuu23fm.0g7GdsL5atoKDuudz1wDW9D2S",
      isActive: true,
    };
  },
  create: (token, userID) => {
    return {
      id: 123,
      token: token,
      UserId: userID,
    };
  },
  remove: (userID) => 123,
};
