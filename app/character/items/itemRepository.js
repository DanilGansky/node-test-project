// todo: create, update, delete
const db = require("../db");
const { Op } = require("sequelize");

const findAll = async () =>
  await db.Item.findAll({
    include: {
      model: db.Parameter,
      through: { attributes: [] },
    },
  });

const findByIDs = async (ids) =>
  await db.Item.findAll({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
    include: {
      model: db.Parameter,
      through: { attributes: [] },
    },
  });

module.exports = {
  findAll,
  findByIDs,
};
