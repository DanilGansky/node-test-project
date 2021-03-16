const db = require("../db");
const { AccessTokenNotFound } = require("./accessTokenExceptions");

const findByUserID = (userID) => {
  return db.AccessToken.findOne({
    where: { UserId: userID },
  });
};

const findByToken = async (token) => {
  const accessToken = await db.AccessToken.findOne({
    where: { token: token },
    include: db.User,
  });

  if (!accessToken) {
    return Promise.reject(AccessTokenNotFound);
  }
  return accessToken;
};

const findByEmail = (email) => {
  return db.AccessToken.findOne({
    include: {
      model: db.User,
      where: { email: email },
    },
  });
};

const create = (token, userID) => {
  return db.AccessToken.create({
    token: token,
    UserId: userID,
    isBlocked: false,
  });
};

const block = (accessToken) => {
  return db.AccessToken.update(
    {
      isBlocked: true,
    },
    {
      where: { UserId: accessToken.UserId },
    }
  );
};

module.exports = {
  findByUserID: findByUserID,
  findByToken: findByToken,
  create: create,
  block: block,
  findByEmail: findByEmail,
};
