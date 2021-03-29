const { toItemsResponse, toItemResponse } = require("./itemMapper");

let itemService;
let logger;

const findAll = async (req, resp) => {
  try {
    const items = await itemService.findAll();
    resp.status(200).json({ items: toItemsResponse(items) });
  } catch (e) {
    const err = errorToObject(e);
    const status = determineStatus(err);
    logger.error({ status: status, message: err, tags: ["findAll"] });
    resp.status(status).json({ error: err });
  }
};

const create = async (req, resp) => {
  try {
    const item = await itemService.create(req.body);
    resp.status(201).json({ item: toItemResponse(item) });
  } catch (e) {
    const err = errorToObject(e);
    const status = determineStatus(err);
    logger.error({ status: status, message: err, tags: ["create"] });
    resp.status(status).json({ error: err });
  }
};

const update = async (req, resp) => {
  try {
    const item = await itemService.update(req.body, req.params.id);
    resp.status(200).json({ item: toItemResponse(item) });
  } catch (e) {
    const err = errorToObject(e);
    const status = determineStatus(err);
    logger.error({ status: status, message: err, tags: ["update"] });
    resp.status(status).json({ error: err });
  }
};

const remove = async (req, resp) => {
  try {
    const item = await itemService.remove(req.params.id);
    resp.status(200).json({ item: toItemResponse(item) });
  } catch (e) {
    const err = errorToObject(e);
    const status = determineStatus(err);
    logger.error({ status: status, message: err, tags: ["remove"] });
    resp.status(status).json({ error: err });
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

const errorToObject = (e) => {
  if (e instanceof Error) {
    return { name: e.name, message: e.message };
  }
  return e;
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
