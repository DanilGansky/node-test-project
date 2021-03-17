module.exports = {
  findAll: () => [],
  findByEmail: (email) => {
    if (email !== "fail@mail.com") {
      return {
        id: 123,
        email: email,
        password:
          "$2a$10$hsTfGVAO8oCmqwDCfzUnkuu23fm.0g7GdsL5atoKDuudz1wDW9D2S",
        isActive: true,
      };
    }
  },
  create: (email, password) => {
    return {
      id: 123,
      email: email,
      password: password,
    };
  },
  activate: (user) => user,
  updateLastLoginDate: (user) => user,
};
