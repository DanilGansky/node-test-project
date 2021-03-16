const { InvalidItemData } = require("./itemExceptions");

let itemRepository;

const findAll = async () => await itemRepository.findAll();

const create = async (body) => {
  const { name, icon, params } = body;
  if (!isValidItemData(name, icon, params)) {
    return Promise.reject(InvalidItemData);
  }

  return itemRepository.create(name, icon, params);
};

const update = async (body, id) => {
  const { name, icon, params } = body;
  if (!isValidItemData(name, icon, params)) {
    return Promise.reject(InvalidItemData);
  }
  if (!id) {
    return Promise.reject(InvalidItemData);
  }

  const item = await itemRepository.findByID(id);
  await itemRepository.update(item, params);
  return await itemRepository.findByID(id);
};

const remove = async (id) => {
  if (!id) {
    return Promise.reject(InvalidItemData);
  }
  return await itemRepository.remove(id);
};

const isValidItemData = (name, icon, params) => {
  if (!name || !icon || !params) {
    return false;
  }

  for (let param of params) {
    if (!param.hasOwnProperty("StatId") || !param.hasOwnProperty("value")) {
      return false;
    }
  }
  return true;
};

module.exports = (repository) => {
  itemRepository = repository;

  return {
    findAll,
    create,
    update,
    remove,
  };
};
