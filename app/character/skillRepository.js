const db = require("./db");
const { Op } = require("sequelize");

const findAll = async () =>
  await db.Skill.findAll({
    include: {
      model: db.Parameter,
      through: { attributes: [] },
    },
  });

const findByIDs = async (ids) =>
  await db.Skill.findAll(
    {
      where: {
        id: {
          [Op.in]: ids,
        },
      },
    },
    {
      include: {
        model: db.Parameter,
        through: { attributes: [] },
      },
    }
  );

module.exports = {
  findAll,
  findByIDs,
};
