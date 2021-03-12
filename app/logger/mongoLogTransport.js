const Transport = require("winston-transport");
const MongoLog = require("./logSchema");

class MongoLogTransport extends Transport {
  constructor(opts) {
    super(opts);
  }

  log(info, callback) {
    setImmediate(() => {
      this.emit("logged", info);
    });

    const entry = new MongoLog({
      message: info.message,
      tags: info.tags,
      status: info.status,
    });

    entry.save();
    callback();
  }
}

module.exports = MongoLogTransport;
