const toItemResponse = (item) => {
  const resp = {
    id: item.id,
    name: item.name,
    icon: item.icon,
  };

  if (item.hasOwnProperty("Parameters")) {
    for (let p of item.Parameters) {
      resp[p.Stat.name] = p.value;
    }
  }
  return resp;
};

const toItemsResponse = (items) => items.map(toItemResponse);

module.exports = {
  toItemResponse,
  toItemsResponse,
};
