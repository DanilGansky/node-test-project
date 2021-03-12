let authService;
let logger;

const register = async (req, resp) => {
  try {
    const user = await authService.register(req.body);
    resp.status(200).json({ user: user });
  } catch (e) {
    logger.error({
      message: e,
      tags: ["register"],
    });
    resp.status(500).json({ error: e });
  }
};

const login = async (req, resp) => {
  try {
    const result = await authService.login(req.body);
    resp.status(200).json({ result: result });
  } catch (e) {
    logger.error({
      message: e,
      tags: ["login"],
    });
    resp.status(500).json({ error: e });
  }
};

const logout = async (req, resp) => {
  try {
    const { email } = req.body;
    const result = await authService.logout(email);
    resp.status(200).json({ result: result });
  } catch (e) {
    logger.error({
      message: e,
      tags: ["logout"],
    });
    resp.status(500).json({ error: e });
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
    logger.error({
      message: e,
      tags: ["sendActivationCode"],
    });
    resp.status(500).json({ error: e });
  }
};

const activate = async (req, resp) => {
  try {
    const result = await authService.activateUser(req.body.activationCode);
    resp.status(200).json({ result: result });
  } catch (e) {
    logger.error({
      message: e,
      tags: ["activate"],
    });
    resp.status(500).json({ error: e });
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
