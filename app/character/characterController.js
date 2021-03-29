const { toCharacterResponse } = require("./characterMapper");

let characterService;
let logger;

const findByID = async (req, resp) => {
  try {
    const character = await characterService.findByID(req.user.id);
    resp.status(200).json({ character: toCharacterResponse(character) });
  } catch (e) {
    const err = errorToObject(e);
    const status = determineStatus(err);
    logger.error({ status: status, message: err, tags: ["findByID"] });
    resp.status(status).json({ error: err });
  }
};

const uploadAvatar = async (req, resp) => {
  const files = req.files;

  try {
    const buffer = Buffer.from(Object.values(files[0].buffer));
    const character = await characterService.uploadAvatar(
      buffer,
      files[0].originalname,
      req.user.id
    );

    resp.status(200).json({ character: toCharacterResponse(character) });
  } catch (e) {
    const err = errorToObject(e);
    const status = determineStatus(err);
    logger.error({ status: status, message: err, tags: ["uploadAvatar"] });
    resp.status(status).json({ error: err });
  }
};

const setDescription = async (req, resp) => {
  const { description } = req.body;

  try {
    const character = await characterService.setDescription(
      description,
      req.user.id
    );

    resp.status(200).json({ character: toCharacterResponse(character) });
  } catch (e) {
    const err = errorToObject(e);
    const status = determineStatus(err);
    logger.error({ status: status, message: err, tags: ["setDescription"] });
    resp.status(status).json({ error: err });
  }
};

const update = async (req, resp) => {
  try {
    const character = await characterService.update(req.body, req.user.id);
    resp.status(200).json({ character: toCharacterResponse(character) });
  } catch (e) {
    const err = errorToObject(e);
    const status = determineStatus(err);
    logger.error({ status: status, message: err, tags: ["update"] });
    resp.status(status).json({ error: err });
  }
};

const setSkills = async (req, resp) => {
  try {
    const character = await characterService.setSkills(
      req.body.skillIDs,
      req.user.id
    );

    resp.status(200).json({ character: toCharacterResponse(character) });
  } catch (e) {
    const err = errorToObject(e);
    const status = determineStatus(err);
    logger.error({ status: status, message: err, tags: ["setSkills"] });
    resp.status(status).json({ error: err });
  }
};

const setItems = async (req, resp) => {
  try {
    const character = await characterService.setItems(
      req.body.itemIDs,
      req.user.id
    );

    resp.status(200).json({ character: toCharacterResponse(character) });
  } catch (e) {
    const err = errorToObject(e);
    const status = determineStatus(err);
    logger.error({ status: status, message: err, tags: ["setItems"] });
    resp.status(status).json({ error: err });
  }
};

const getStats = async (req, resp) => {
  try {
    const stats = await characterService.getStats(req.user.id);
    resp.status(200).json({ stats: stats });
  } catch (e) {
    const err = errorToObject(e);
    const status = determineStatus(err);
    logger.error({ status: status, message: err, tags: ["getStats"] });
    resp.status(status).json({ error: err });
  }
};

const determineStatus = (e) => {
  switch (e.name) {
    case "CharacterNotFound":
      return 404;
    case "InvalidCharacter":
      return 400;
    default:
      return 500;
  }
};

const errorToObject = (e) => {
  if (e instanceof Error) {
    return { name: e.name, message: e.message };
  }
  return e;
};

module.exports = (service, log) => {
  characterService = service;
  logger = log;

  return {
    findByID,
    setSkills,
    setItems,
    uploadAvatar,
    setDescription,
    update,
    getStats,
  };
};
