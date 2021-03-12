let characterService;
let logger;

const findByID = async (req, resp) => {
  try {
    const character = await characterService.findByID(req.user.id);
    resp.status(200).json({ character: character });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["findByID"] });
    resp.status(status).json({ error: e });
  }
};

const uploadAvatar = async (req, resp) => {
  const files = req.files;
  const buffer = Buffer.from(Object.values(files[0].buffer));

  try {
    const outPath = await characterService.uploadAvatar(
      buffer,
      files[0].originalname,
      req.user.id
    );
    resp.status(200).json({ outPath: outPath });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["uploadAvatar"] });
    resp.status(status).json({ error: e });
  }
};

const setDescription = async (req, resp) => {
  const { description } = req.body;

  try {
    const character = await characterService.setDescription(
      description,
      req.user.id
    );

    resp.status(200).json({ character: character });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["setDescription"] });
    resp.status(status).json({ error: e });
  }
};

const update = async (req, resp) => {
  try {
    const character = await characterService.update(req.body, req.user.id);
    resp.status(200).json({ character: character });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["update"] });
    resp.status(status).json({ error: e });
  }
};

const setSkills = async (req, resp) => {
  try {
    const character = await characterService.setSkills(
      req.body.skillIDs,
      req.user.id
    );
    resp.status(200).json({ character: character });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["setSkills"] });
    resp.status(status).json({ error: e });
  }
};

const setItems = async (req, resp) => {
  try {
    const character = await characterService.setItems(
      req.body.itemIDs,
      req.user.id
    );
    resp.status(200).json({ character: character });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["setItems"] });
    resp.status(status).json({ error: e });
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
  };
};
