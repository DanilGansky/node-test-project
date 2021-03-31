module.exports = {
  findAll: () => ["stat"],
  findByID: (statID) => {
    return {
      id: statID,
      name: "stat",
    };
  },
  createDefaultCharacterStats: (characterID) => [],
};
