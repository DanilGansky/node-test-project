let skillService;
let logger;

const findAll = async (req, resp) => {
  try {
    const skills = await skillService.findAll();
    resp.status(200).json({ skills: skills });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["findAll"] });
    resp.status(status).json({ error: e });
  }
};

const create = async (req, resp) => {
  try {
    const skill = await skillService.create(req.body);
    resp.status(201).json({ skill: skill });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["create"] });
    resp.status(status).json({ error: e });
  }
};

const update = async (req, resp) => {
  try {
    const skill = await skillService.update(req.body, req.params.id);
    resp.status(200).json({ skill: skill });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["update"] });
    resp.status(status).json({ error: e });
  }
};

const remove = async (req, resp) => {
  try {
    const skill = await skillService.remove(req.params.id);
    resp.status(200).json({ skill: skill });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["remove"] });
    resp.status(status).json({ error: e });
  }
};

const determineStatus = (e) => {
  switch (e.name) {
    case "SkillNotFound":
      return 404;
    case "InvalidSkillData":
      return 400;
    default:
      return 500;
  }
};

module.exports = (service, log) => {
  skillService = service;
  logger = log;

  return {
    findAll,
    create,
    update,
    remove,
  };
};
