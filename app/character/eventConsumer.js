const amqp = require("amqplib/callback_api");
const characterService = require("./characterService");
const { appConfig } = require("../config");

const exchange = "messages";
let channel;

const startReceiving = () => {
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

      channel.assertQueue(
        "",
        {
          exclusive: true,
        },
        function (err2, q) {
          if (err2) {
            throw err2;
          }

          channel.bindQueue(q.queue, exchange, "");
          channel.consume(
            q.queue,
            async function (msg) {
              if (msg.content) {
                await handlerEvents(msg.content);
              }
            },
            {
              noAck: true,
            }
          );
        }
      );
    });
  });
};

const handlerEvents = async (event) => {
  console.log(`received new event: ${event.toString()}`);
  const data = JSON.parse(event);
  switch (data.name) {
    case "UserRegistered":
      await characterService.create(data.userID);
      break;
  }
};

module.exports = {
  startReceiving,
};
