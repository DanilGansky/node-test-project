let authService;
let logger;

const register = async (req, resp) => {
  try {
    const user = await authService.register(req.body);
    resp.status(200).json({ user: user });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["register"] });
    resp.status(status).json({ error: e });
  }
};

const login = async (req, resp) => {
  try {
    const result = await authService.login(req.body);
    resp.status(200).json({ result: result });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["login"] });
    resp.status(status).json({ error: e });
  }
};

const logout = async (req, resp) => {
  try {
    const { email } = req.body;
    const result = await authService.logout(email);
    resp.status(200).json({ result: result });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["logout"] });
    resp.status(status).json({ error: e });
  }
};

const sendActivationCode = async (req, resp) => {
  try {
    const { activationToken, phoneNumber } = req.body;
    const result = await authService.sendActivationCode(
      activationToken,
      phoneNumber
    );
    resp.status(200).json({ result: result });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["sendActivationCode"] });
    resp.status(status).json({ error: e });
  }
};

const activate = async (req, resp) => {
  try {
    const result = await authService.activateUser(req.body.activationCode);
    resp.status(200).json({ result: result });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["activate"] });
    resp.status(status).json({ error: e });
  }
};

const determineStatus = (e) => {
  switch (e.name) {
    case "InvalidCredentials":
      return 400;
    case "UserAlreadyRegistered":
      return 400;
    case "UserNotFound":
      return 404;
    case "InvalidPhoneNumber":
      return 400;
    case "UserNotActivated":
      return 403;
    case "UserIsNotLoggedIn":
      return 403;
    case "AccessTokenNotFound":
      return 404;
    case "ActivationCodeNotFound":
      return 404;
    case "InvalidActivationCode":
      return 400;
    case "ActivationTokenNotFound":
      return 404;
    default:
      return 500;
  }
};

module.exports = (service, log) => {
  authService = service;
  logger = log;

  return {
    register: register,
    login: login,
    logout: logout,
    sendActivationCode: sendActivationCode,
    activate: activate,
  };
};
