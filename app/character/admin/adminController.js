let adminService;

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

module.exports = (service) => {
  adminService = service;

  return {
    findAll,
    findByID,
  };
};
