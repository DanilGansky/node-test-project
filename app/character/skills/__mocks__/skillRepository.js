module.exports = {
  findAll: () =>
    Promise.resolve([
      { id: 1, name: "skill", Parameters: [{}] },
      { id: 2, name: "skill", Parameters: [{}] },
      { id: 3, name: "skill", Parameters: [{}] },
    ]),
  findByID: (id) => {
    return {
      id: id,
      name: "skill",
      Parameters: [{}],
    };
  },
  findByIDs: (id) => {
    return [
      {
        id: id,
        name: "item",
        Parameters: [{}],
      },
    ];
  },
  create: (name, params) => {
    return {
      id: 123,
      name: name,
      Parameters: params,
    };
  },
  update: (skill, params) => skill.id,
  remove: (skillID) => skillID,
};
