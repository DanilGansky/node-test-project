const {
  toCharacterResponse,
  toCharactersResponse,
} = require("../characterMapper");

let adminService;
let logger;

const findAll = async (req, resp) => {
  try {
    const characters = await adminService.findAll();
    resp.status(200).json({ characters: toCharactersResponse(characters) });
  } catch (e) {
    const err = errorToObject(e);
    logger.error({ status: 500, message: err, tags: ["findAll"] });
    resp.status(500).json({ error: err });
  }
};

const findByID = async (req, resp) => {
  try {
    const character = await adminService.findByID(req.params);
    resp.status(200).json({ character: toCharacterResponse(character) });
  } catch (e) {
    const err = errorToObject(e);
    logger.error({ status: 500, message: err, tags: ["findByID"] });
    resp.status(500).json({ error: err });
  }
};

const errorToObject = (e) => {
  if (e instanceof Error) {
    return { name: e.name, message: e.message };
  }
  return e;
};

module.exports = (service, log) => {
  adminService = service;
  logger = log;

  return {
    findAll,
    findByID,
  };
};
