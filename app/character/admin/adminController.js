let adminService;
let logger;

const findAll = async (req, resp) => {
  try {
    const characters = await adminService.findAll();
    resp.status(200).json({ characters: characters });
  } catch (e) {
    logger.error({ status: 500, message: e, tags: ["findAll"] });
    resp.status(500).json({ error: e });
  }
};

const findByID = async (req, resp) => {
  try {
    const character = await adminService.findByID(req.params);
    resp.status(200).json({ character: character });
  } catch (e) {
    logger.error({ status: 404, message: e, tags: ["findByID"] });
    resp.status(404).json({ error: e });
  }
};

module.exports = (service, log) => {
  adminService = service;
  logger = log;

  return {
    findAll,
    findByID,
  };
};
