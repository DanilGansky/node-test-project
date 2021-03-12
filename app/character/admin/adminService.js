let characterRepository;

const findAll = async () => await characterRepository.findAll();

const findByID = async (params) => {
  const { id } = params;
  return await characterRepository.findByID(id);
};

module.exports = (repository) => {
  characterRepository = repository;

  return {
    findAll,
    findByID,
  };
};
