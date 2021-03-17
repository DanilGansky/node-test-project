module.exports = {
  findByUserID: (userID) => {
    return { id: 123, token: "123", block: false, UserId: userID };
  },
  findByToken: (token) => {
    return { id: 123, token: token, block: false, UserId: 123 };
  },
  findByEmail: (email) => {
    return { id: 123, token: "123", block: false, UserId: 123 };
  },
  create: (token, userID) => {
    return { id: 123, token: token, block: false, UserId: userID };
  },
  block: (accessToken) => {},
};
