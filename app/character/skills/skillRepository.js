const db = require("../db");
const { SkillNotFound } = require("./skillExceptions");
const { Op } = require("sequelize");

const findAll = async () =>
  await db.Skill.findAll({
    include: {
      model: db.Parameter,
      through: { attributes: [] },
      include: {
        model: db.Stat,
        order: [["id", "ASC"]],
      },
    },
    order: [["id", "ASC"]],
  });

const findByID = async (id) => {
  const skill = await db.Skill.findOne({
    where: { id: id },
    include: {
      model: db.Parameter,
      through: { attributes: [] },
      include: {
        model: db.Stat,
        order: [["id", "ASC"]],
      },
    },
  });

  if (!skill) {
    return Promise.reject(SkillNotFound);
  }
  return skill;
};

const findByIDs = async (ids) =>
  await db.Skill.findAll({
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
    },
    order: [["id", "ASC"]],
  });

const create = async (name, params) => {
  const skill = await db.Skill.create(
    { name: name },
    {
      include: {
        model: db.Parameter,
        through: { attributes: [] },
        include: {
          model: db.Stat,
          order: [["id", "ASC"]],
        },
      },
    }
  );

  const parameters = await db.Parameter.bulkCreate(params);
  await skill.setParameters(parameters);
  return skill;
};

const update = async (skill, params) => {
  const id = await db.Skill.update(
    { name: skill.name },
    {
      where: {
        id: skill.id,
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
      },
    }
  );

  if (!id) {
    return Promise.reject(SkillNotFound);
  }

  await db.Parameter.destroy({
    where: {
      id: await skill.getParameters().then((params) => params.map((p) => p.id)),
    },
  });

  const parameters = await db.Parameter.bulkCreate(params);
  await skill.setParameters(parameters);
  return id;
};

const remove = async (skillID) => {
  const skill = await findByID(skillID);
  await db.Parameter.destroy({
    where: {
      id: await skill.getParameters().then((params) => params.map((p) => p.id)),
    },
  });

  const id = await db.Skill.destroy({ where: { id: skillID } });
  if (!id) {
    return Promise.reject(SkillNotFound);
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
