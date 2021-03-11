const adminService = require("./adminService");

const findAll = async (req, resp) => {
  try {
    const characters = await adminService.findAll();
    resp.status(200).json({ characters: characters });
  } catch (e) {
    resp.status(200).json({ error: e });
  }
};

const findByID = async (req, resp) => {
  try {
    const character = await adminService.findByID(req.params);
    resp.status(200).json({ character: character });
  } catch (e) {
    resp.status(200).json({ error: e });
  }
};

const findAllSkills = async (req, resp) => {
  try {
    const skills = await adminService.findAllSkills();
    resp.status(200).json({ skills: skills });
  } catch (e) {
    resp.status(500).json({ error: e });
  }
};

const findAllItems = async (req, resp) => {
  try {
    const items = await adminService.findAllItems();
    resp.status(200).json({ items: items });
  } catch (e) {
    resp.status(500).json({ error: e });
  }
};

module.exports = {
  findAll,
  findByID,
  findAllSkills,
  findAllItems,
};
