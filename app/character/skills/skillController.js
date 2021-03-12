const skillService = require("./skillService");

const findAll = async (req, resp) => {
  try {
    const skills = await skillService.findAll();
    resp.status(200).json({ skills: skills });
  } catch (e) {
    resp.status(500).json({ error: e });
  }
};

const create = async (req, resp) => {
  try {
    const skill = await skillService.create(req.body);
    resp.status(200).json({ skill: skill });
  } catch (e) {
    resp.status(500).json({ error: e });
  }
};

const update = async (req, resp) => {
  try {
    const skill = await skillService.update(req.body, req.params.id);
    resp.status(200).json({ skill: skill });
  } catch (e) {
    resp.status(500).json({ error: e });
  }
};

const remove = async (req, resp) => {
  try {
    const skill = await skillService.remove(req.params.id);
    resp.status(200).json({ skill: skill });
  } catch (e) {
    resp.status(500).json({ error: e });
  }
};

module.exports = {
  findAll,
  create,
  update,
  remove,
};
