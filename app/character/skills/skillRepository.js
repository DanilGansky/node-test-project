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
  await db.Skill.create(
    {
      name: name,
      Parameters: params,
    },
    {
      include: db.Parameter,
    }
  );
};

const update = async (skill, params) => {
  const id = await db.Skill.update(
    { name: skill.name },
    {
      where: {
        id: skill.id,
      },
    }
  );

  if (!id) {
    return Promise.reject(SkillNotFound);
  }

  await skill.setParameters(params);
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
  findByIDs,
  create,
  update,
  remove,
};
