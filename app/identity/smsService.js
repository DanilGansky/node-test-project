const { smsSenderConfig } = require("../config");
const sender = require("twilio")(
  smsSenderConfig.TWILIO_ACCOUNT_SID,
  smsSenderConfig.TWILIO_AUTH_TOKEN
);

let activationCodeRepository;

const sendSMS = async (to, userID) => {
  const code = generateActivationCode();
  await activationCodeRepository.create(code, userID);
  return sender.messages.create({
    body: `Hello. Confirm your account. Enter this code: ${code}`,
    from: smsSenderConfig.TWILIO_NUMBER,
    to: to,
  });
};

const generateActivationCode = () => {
  return Math.floor(Math.random() * (999999 - 100000) + 100000);
};

module.exports = (repository) => {
  activationCodeRepository = repository;
  return {
    sendSMS: sendSMS,
  };
};
