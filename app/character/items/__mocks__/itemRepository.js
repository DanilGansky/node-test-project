module.exports = {
  findAll: () =>
    Promise.resolve([
      { id: 1, name: "item", Parameters: [{}] },
      { id: 2, name: "item", Parameters: [{}] },
      { id: 3, name: "item", Parameters: [{}] },
    ]),
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
        icon: "icon",
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
  update: (item, params) => item.id,
  remove: (itemID) => itemID,
};
