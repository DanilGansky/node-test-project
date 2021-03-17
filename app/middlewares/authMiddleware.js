const jwt = require("jsonwebtoken");
const { appConfig } = require("../config");

let accessTokenRepository;

const AUTH_PREFIX = "Bearer ";

const authMiddleware = async (req, resp, next) => {
  let token = req.headers.authorization;
  if (!token) {
    resp.status(401).json({ error: InvalidToken });
    return;
  }

  if (token.startsWith(AUTH_PREFIX)) {
    token = token.slice(7, token.length);
  }

  let accessToken;
  try {
    accessToken = await accessTokenRepository.findByToken(token);
  } catch (e) {
    resp.status(401).json({ error: e });
    return;
  }

  if (accessToken.isTest) {
    req.user = accessToken.User;
    next();
    return;
  }

  if (accessToken.isBlocked) {
    resp.status(401).json(BlockedToken);
    return;
  }

  try {
    req.email = jwt.verify(token, appConfig.SECRET).data;
  } catch (e) {
    resp.status(401).json({ error: InvalidToken });
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

module.exports = (repository) => {
  accessTokenRepository = repository;
  return authMiddleware;
};
