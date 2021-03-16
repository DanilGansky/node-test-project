const amqp = require("amqplib/callback_api");
const { appConfig } = require("../config");

const exchange = "messages";
let channel;

amqp.connect(appConfig.RABBIT_URL, (err, conn) => {
  if (err) {
    throw err;
  }

  conn.createChannel((err1, ch) => {
    if (err1) {
      throw err1;
    }

    channel = ch;
    channel.assertExchange(exchange, "fanout", {
      durable: false,
    });
  });
});

const sendEvent = (event) => {
  const e = JSON.stringify(event);
  channel.publish(exchange, "", Buffer.from(e));
  console.log(`sent event: ${e}`);
};

module.exports = {
  sendEvent: sendEvent,
};
