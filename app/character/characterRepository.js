const characterExceptions = require("./characterExceptions");
const db = require("./db");

const findByUserID = async (userID) => {
  const character = await db.Character.findOne({
    where: { UserId: userID },
    include: [
      {
        model: db.Skill,
        include: {
          model: db.Parameter,
          through: { attributes: [] },
        },
        through: { attributes: [] },
      },
      {
        model: db.Item,
        include: {
          model: db.Parameter,
          through: { attributes: [] },
        },
        through: { attributes: [] },
      },
    ],
  });

  if (!character) {
    return Promise.reject(characterExceptions.CharacterNotFound);
  }
  return character;
};

const create = (data) => {
  return db.Character.create(data);
};

const update = (data, id) => {
  return db.Character.update(data, {
    where: { id: id },
  });
};

module.exports = {
  findByUserID: findByUserID,
  create: create,
  update: update,
};
