const characterService = require("./characterService");

const findByID = async (req, resp) => {
  try {
    const character = await characterService.findByID(req.user.id);
    resp.status(200).json({ character: character });
  } catch (e) {
    resp.status(404).json({ error: e });
  }
};

const findAllSkills = async (req, resp) => {
  try {
    const skills = await characterService.findAllSkills();
    resp.status(200).json({ skills: skills });
  } catch (e) {
    resp.status(500).json({ error: e });
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
    resp.status(500).json({ error: e });
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
    resp.status(500).json({ error: e });
  }
};

const update = async (req, resp) => {
  try {
    const character = await characterService.update(req.body, req.user.id);
    resp.status(200).json({ character: character });
  } catch (e) {
    resp.status(500).json({ error: e });
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
    resp.status(500).json({ error: e });
  }
};

module.exports = {
  findByID: findByID,
  findAllSkills: findAllSkills,
  setSkills: setSkills,
  uploadAvatar: uploadAvatar,
  setDescription: setDescription,
  update: update,
};
