module.exports = {
  findAll: () => [{}],
  findByID: (id) => {
    return {
      id: id,
      name: "item",
      icon: "icon",
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
