const { toSkillResponse, toSkillsResponse } = require("./skillMapper");

let skillService;
let logger;

const findAll = async (req, resp) => {
  try {
    const skills = await skillService.findAll();
    resp.status(200).json({ skills: toSkillsResponse(skills) });
  } catch (e) {
    const err = errorToObject(e);
    const status = determineStatus(err);
    logger.error({ status: status, message: err, tags: ["findAll"] });
    resp.status(status).json({ error: err });
  }
};

const create = async (req, resp) => {
  try {
    const skill = await skillService.create(req.body);
    resp.status(201).json({ skill: toSkillResponse(skill) });
  } catch (e) {
    const err = errorToObject(e);
    const status = determineStatus(err);
    logger.error({ status: status, message: err, tags: ["create"] });
    resp.status(status).json({ error: err });
  }
};

const update = async (req, resp) => {
  try {
    const skill = await skillService.update(req.body, req.params.id);
    resp.status(200).json({ skill: toSkillResponse(skill) });
  } catch (e) {
    const err = errorToObject(e);
    const status = determineStatus(err);
    logger.error({ status: status, message: err, tags: ["update"] });
    resp.status(status).json({ error: err });
  }
};

const remove = async (req, resp) => {
  try {
    await skillService.remove(req.params.id);
    resp.status(204).send();
  } catch (e) {
    const err = errorToObject(e);
    const status = determineStatus(err);
    logger.error({ status: status, message: err, tags: ["remove"] });
    resp.status(status).json({ error: err });
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

const errorToObject = (e) => {
  if (e instanceof Error) {
    return { name: e.name, message: e.message };
  }
  return e;
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
