const stats = [];
const skills = [];
const items = [];
const getStats = () => [{}];
const updateAmmunition = (ammunition) => {};

module.exports = {
  findAll: () => [{}],
  findByID: (id) => {
    return {
      id: id,
      UserId: 123,
      getStats: getStats,
      updateAmmunition: updateAmmunition,
      Skills: skills,
      Items: items,
      Stats: stats,
    };
  },
  findByUserID: (userID) => {
    return {
      id: 123,
      UserId: userID,
      getStats: getStats,
      updateAmmunition: updateAmmunition,
      Skills: skills,
      Items: items,
      Stats: stats,
    };
  },
  create: (data) => {
    return {
      id: 123,
      UserId: 123,
      getStats: getStats,
      updateAmmunition: updateAmmunition,
      Skills: skills,
      Items: items,
      Stats: stats,
      ...data,
    };
  },
  update: (data, id) => {
    return {
      id: id,
      UserId: 123,
      getStats: getStats,
      updateAmmunition: updateAmmunition,
      Skills: skills,
      Items: items,
      Stats: stats,
      ...data,
    };
  },
  findCharacterStat: (statID, characterID) => {
    return {
      CharacterId: characterID,
      UserId: 123,
      value: 5,
    };
  },
};
