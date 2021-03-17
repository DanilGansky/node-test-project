const jwt = require("jsonwebtoken");
const { appConfig } = require("../config");

let accessTokenRepository;

const AUTH_PREFIX = "Bearer ";

const authMiddleware = async (req, resp, next) => {
  let token = req.headers.authorization;
  if (!token) {
    resp.status(401).json(InvalidToken);
    return;
  }
  if (token.startsWith(AUTH_PREFIX)) {
    token = token.slice(7, token.length);
  }

  try {
    req.email = jwt.verify(token, appConfig.SECRET).data;
  } catch (e) {
    const err = errorToObject(e);
    resp.status(401).json(InvalidToken);
    return;
  }

  const accessToken = await accessTokenRepository.findByToken(token);
  if (accessToken.isBlocked) {
    resp.status(401).json(BlockedToken);
    return;
  }

  req.user = accessToken.User;
  next();
};

const InvalidToken = {
  name: "InvalidToken",
  message: "invalid token",
};

const BlockedToken = {
  name: "BlockedToken",
  message: "this token cannot be used for accessing",
};

const errorToObject = (e) => {
  if (e instanceof Error) {
    return { name: e.name, message: e.message };
  }
  return e;
};

module.exports = (repository) => {
  accessTokenRepository = repository;
  return authMiddleware;
};
