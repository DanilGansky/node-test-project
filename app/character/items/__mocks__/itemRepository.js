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
        icon: "icon",
        Parameters: [{}],
      },
    ];
  },
  create: (name, icon, params) => {
    return {
      id: 123,
      name: name,
      icon: icon,
      Parameters: params,
    };
  },
  update: (item, params) => item.id,
  remove: (itemID) => itemID,
};
