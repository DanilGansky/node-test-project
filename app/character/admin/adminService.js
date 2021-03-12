const characterRepository = require("../characterRepository");

const findAll = async () => await characterRepository.findAll();

const findByID = async (params) => {
  const { id } = params;
  return await characterRepository.findByID(id);
};

module.exports = {
  findAll,
  findByID,
};
