const db = require("../db");
const { SkillNotFound } = require("./skillExceptions");
const { Op } = require("sequelize");

const findAll = async () =>
  await db.Skill.findAll({
    include: {
      model: db.Parameter,
      through: { attributes: [] },
    },
  });

const findByID = async (id) => {
  const skill = await db.Skill.findOne({
    where: { id: id },
    include: {
      model: db.Parameter,
      through: { attributes: [] },
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
    },
  });

const create = async (name, params) => {
  const skill = await db.Skill.create(
    { name: name },
    {
      include: {
        model: db.Parameter,
        through: { attributes: [] },
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
      },
    }
  );

  if (!id) {
    return Promise.reject(SkillNotFound);
  }

  const parameters = await db.Parameter.bulkCreate(params);
  await skill.removeParameters();
  await skill.setParameters(parameters);
  return id;
};

const remove = async (skillID) => {
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
