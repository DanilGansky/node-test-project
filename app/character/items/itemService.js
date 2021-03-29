const { appConfig } = require("../../config");
const { InvalidItemData } = require("./itemExceptions");

let itemRepository;
let uploadService;

const findAll = async () => await itemRepository.findAll();

const create = async (body) => {
  const { name, params } = body;
  if (!isValidItemData(name, params)) {
    return Promise.reject(InvalidItemData);
  }

  return itemRepository.create(name, params);
};

const uploadIcon = async (data, filename, itemID) => {
  const item = await itemRepository.findByID(itemID);
  const filePath = await uploadService.upload(data, filename);

  item.icon = getIconURL(filePath);
  await itemRepository.update(item);
  return await itemRepository.findByID(item.id);
};

const update = async (body, id) => {
  const { name, params } = body;
  if (!isValidItemData(name, params)) {
    return Promise.reject(InvalidItemData);
  }
  if (!id) {
    return Promise.reject(InvalidItemData);
  }

  const item = await itemRepository.findByID(id);
  item.name = name;

  await itemRepository.update(item, params);
  return await itemRepository.findByID(id);
};

const remove = async (id) => {
  if (!id) {
    return Promise.reject(InvalidItemData);
  }
  return await itemRepository.remove(id);
};

const isValidItemData = (name, params) => {
  if (!name || !params) {
    return false;
  }

  for (let param of params) {
    if (!param.hasOwnProperty("StatId") || !param.hasOwnProperty("value")) {
      return false;
    }
  }
  return true;
};

const getIconURL = (filePath) => {
  const dirs = filePath.split("/");
  return `http://${appConfig.HOST}:${appConfig.PORT}/media/${
    dirs[dirs.length - 1]
  }`;
};

module.exports = (repository, uploader) => {
  itemRepository = repository;
  uploadService = uploader;

  return {
    findAll,
    create,
    uploadIcon,
    update,
    remove,
  };
};
