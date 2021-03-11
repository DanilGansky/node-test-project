const characterRepository = require("../characterRepository");
const skillRepository = require("../skills/skillRepository");
const itemRepository = require("../items/itemRepository");
const { InvalidSkillData } = require("../skills/skillExceptions");

const findAll = async () => await characterRepository.findAll();

const findByID = async (params) => {
  const { id } = params;
  return await characterRepository.findByID(id);
};

const findAllSkills = async () => await skillRepository.findAll();

const findAllItems = async () => await itemRepository.findAll();

const create = async (body) => {
  const { name, params } = body;
  if (!isValidSkillData(name, params)) {
    return Promise.reject(InvalidSkillData);
  }

  return await skillRepository.create(name, params);
};

const update = async (body) => {
  const { name, params } = body;
  if (!isValidSkillData(name, params)) {
    return Promise.reject(InvalidSkillData);
  }

  return await skillRepository.update(name, params);
};

const remove = async (params) => {
  const { id } = params;
  if (!id) {
    return Promise.reject(InvalidSkillData);
  }

  return await skillRepository.remove(id);
};

const isValidSkillData = (name, params) => name && params;

module.exports = {
  findAll,
  findByID,
  findAllSkills,
  findAllItems,
  create,
  update,
  remove,
};
