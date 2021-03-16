let itemService;
let logger;

const findAll = async (req, resp) => {
  try {
    const items = await itemService.findAll();
    resp.status(200).json({ items: items });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["findAll"] });
    resp.status(status).json({ error: e });
  }
};

const create = async (req, resp) => {
  try {
    const item = await itemService.create(req.body);
    resp.status(201).json({ item: item });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["create"] });
    resp.status(status).json({ error: e });
  }
};

const update = async (req, resp) => {
  try {
    const item = await itemService.update(req.body, req.params.id);
    resp.status(200).json({ item: item });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["update"] });
    resp.status(status).json({ error: e });
  }
};

const remove = async (req, resp) => {
  try {
    const item = await itemService.remove(req.params.id);
    resp.status(200).json({ item: item });
  } catch (e) {
    const status = determineStatus(e);
    logger.error({ status: status, message: e, tags: ["remove"] });
    resp.status(status).json({ error: e });
  }
};

const determineStatus = (e) => {
  switch (e.name) {
    case "ItemNotFound":
      return 404;
    case "InvalidItemData":
      return 400;
    default:
      return 500;
  }
};

module.exports = (service, log) => {
  itemService = service;
  logger = log;

  return {
    findAll,
    create,
    update,
    remove,
  };
};
