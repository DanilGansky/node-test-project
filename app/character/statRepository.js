const db = require("./db");

const findByID = (statID) => db.Stat.findOne({ where: { id: statID } });

module.exports = {
  findByID,
};
