module.exports = {
  findByID: (statID) => {
    return {
      id: statID,
      name: "stat",
    };
  },
  createDefaultCharacterStats: (characterID) => [],
};
