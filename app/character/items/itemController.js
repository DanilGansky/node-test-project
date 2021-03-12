const itemService = require("./itemService");

const findAll = async (req, resp) => {
  try {
    const items = await itemService.findAll();
    resp.status(200).json({ items: items });
  } catch (e) {
    resp.status(500).json({ error: e });
  }
};

module.exports = {
  findAll,
};
