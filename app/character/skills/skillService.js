const { InvalidSkillData } = require("../skills/skillExceptions");

let skillRepository;

const findAll = async () => await skillRepository.findAll();

const create = async (body) => {
  const { name, params } = body;
  if (!isValidSkillData(name, params)) {
    return Promise.reject(InvalidSkillData);
  }

  return skillRepository.create(name, params);
};

const update = async (body, id) => {
  const { name, params } = body;
  if (!isValidSkillData(name, params)) {
    return Promise.reject(InvalidSkillData);
  }
  if (!id) {
    return Promise.reject(InvalidSkillData);
  }

  const skill = await skillRepository.findByID(id);
  skill.name = name;

  await skillRepository.update(skill, params);
  return await skillRepository.findByID(id);
};

const remove = async (id) => {
  if (!id) {
    return Promise.reject(InvalidSkillData);
  }
  return await skillRepository.remove(id);
};

const isValidSkillData = (name, params) => {
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

module.exports = (repository) => {
  skillRepository = repository;

  return {
    findAll,
    create,
    update,
    remove,
  };
};
