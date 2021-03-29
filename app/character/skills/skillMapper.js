const toSkillResponse = (skill) => {
  const resp = {
    id: skill.id,
    name: skill.name,
  };

  if (skill.hasOwnProperty("Parameters")) {
    for (let p of skill.Parameters) {
      resp[p.Stat.name] = p.value;
    }
  }
  return resp;
};

const toSkillsResponse = (skills) => skills.map(toSkillResponse);

module.exports = {
  toSkillResponse,
  toSkillsResponse,
};
