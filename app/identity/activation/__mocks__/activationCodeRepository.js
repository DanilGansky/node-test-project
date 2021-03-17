module.exports = {
  findUserByCode: (code) => {
    return {
      id: 123,
      email: "test@mail.com",
      password: "$2a$10$hsTfGVAO8oCmqwDCfzUnkuu23fm.0g7GdsL5atoKDuudz1wDW9D2S",
      isActive: true,
    };
  },
  create: (code, userID) => {
    return {
      id: 123,
      code: code,
      UserId: userID,
    };
  },
  remove: (code) => 123,
};
