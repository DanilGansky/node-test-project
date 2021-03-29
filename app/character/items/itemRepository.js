const db = require("../db");
const { Op } = require("sequelize");
const { ItemNotFound } = require("./itemExceptions");

const findAll = async () =>
  await db.Item.findAll({
    include: {
      model: db.Parameter,
      through: { attributes: [] },
      include: {
        model: db.Stat,
        order: [["id", "ASC"]],
      },
      order: [["id", "ASC"]],
    },
    order: [["id", "ASC"]],
  });

const findByID = async (id) => {
  const item = await db.Item.findOne(
    {
      where: {
        id: id,
      },
    },
    {
      include: {
        model: db.Parameter,
        through: { attributes: [] },
        include: {
          model: db.Stat,
          order: [["id", "ASC"]],
        },
        order: [["id", "ASC"]],
      },
    }
  );

  if (!item) {
    return Promise.reject(ItemNotFound);
  }
  return item;
};

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
      include: {
        model: db.Stat,
        order: [["id", "ASC"]],
      },
      order: [["id", "ASC"]],
    },
    order: [["id", "ASC"]],
  });

const create = async (name, icon, params) => {
  const item = await db.Item.create(
    { name: name, icon: icon },
    {
      include: {
        model: db.Parameter,
        through: { attributes: [] },
        include: {
          model: db.Stat,
          order: [["id", "ASC"]],
        },
        order: [["id", "ASC"]],
      },
    }
  );

  const parameters = await db.Parameter.bulkCreate(params);
  await item.setParameters(parameters);
  return item;
};

const update = async (item, params) => {
  const id = await db.Item.update(
    { name: item.name, icon: item.icon },
    {
      where: {
        id: item.id,
      },
    },
    {
      include: {
        model: db.Parameter,
        through: { attributes: [] },
        include: {
          model: db.Stat,
          order: [["id", "ASC"]],
        },
        order: [["id", "ASC"]],
      },
    }
  );

  if (!id) {
    return Promise.reject(ItemNotFound);
  }

  if (params) {
    await db.Parameter.destroy({
      where: {
        id: await item
          .getParameters()
          .then((params) => params.map((p) => p.id)),
      },
    });

    const parameters = await db.Parameter.bulkCreate(params);
    await item.setParameters(parameters);
  }
  return id;
};

const remove = async (itemID) => {
  const item = await findByID(itemID);
  await db.Parameter.destroy({
    where: {
      id: await item.getParameters().then((params) => params.map((p) => p.id)),
    },
  });

  const id = await db.Item.destroy({ where: { id: itemID } });
  if (!id) {
    return Promise.reject(ItemNotFound);
  }
  return id;
};

module.exports = {
  findAll,
  findByID,
  findByIDs,
  create,
  update,
  remove,
};
