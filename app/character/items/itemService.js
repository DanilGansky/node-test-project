const itemRepository = require("./itemRepository");

const findAll = async () => await itemRepository.findAll();

module.exports = {
  findAll,
};
