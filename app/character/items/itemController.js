let itemService;

const findAll = async (req, resp) => {
  try {
    const items = await itemService.findAll();
    resp.status(200).json({ items: items });
  } catch (e) {
    resp.status(500).json({ error: e });
  }
};

const create = async (req, resp) => {
  try {
    const item = await itemService.create(req.body);
    resp.status(200).json({ item: item });
  } catch (e) {
    resp.status(500).json({ error: e });
  }
};

const update = async (req, resp) => {
  try {
    const item = await itemService.update(req.body, req.params.id);
    resp.status(200).json({ item: item });
  } catch (e) {
    resp.status(500).json({ error: e });
  }
};

const remove = async (req, resp) => {
  try {
    const item = await itemService.remove(req.params.id);
    resp.status(200).json({ item: item });
  } catch (e) {
    resp.status(500).json({ error: e });
  }
};

module.exports = (service) => {
  itemService = service;

  return {
    findAll,
    create,
    update,
    remove,
  };
};
