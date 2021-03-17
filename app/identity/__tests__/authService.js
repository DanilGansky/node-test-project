const activationTokenRepository = require("../activation/__mocks__/activationTokenRepository");
const activationCodeRepository = require("../activation/__mocks__/activationCodeRepository");
const accessTokenRepository = require("../activation/__mocks__/accessTokenRepository");
const userRepository = require("../users/__mocks__/userRepository");
const emailService = require("../__mocks__/emailService");
const smsService = require("../__mocks__/smsService");
const eventSenderService = require("../__mocks__/eventSenderService");
const authService = require("../authService")(
  emailService,
  smsService,
  userRepository,
  eventSenderService,
  activationTokenRepository,
  accessTokenRepository,
  activationCodeRepository
);

describe("test of authService (unit test)", () => {
  test("register", async () => {
    const credentials = { email: "fail@mail.com", password: "1234" };
    const user = await authService.register(credentials);
    expect(user.id).not.toBeUndefined();
    expect(user.email).not.toBeUndefined();
    expect(user.password).not.toBeUndefined();
  });

  test("login", async () => {
    const credentials = {
      email: "test@mail.com",
      password: "1234",
      phoneNumber: "+380851748578",
    };

    const result = await authService.login(credentials);
    expect(result).not.toBeUndefined();
  });

  test("sendActivationCode", async () => {
    const activationToken =
      "$2a$10$hsTfGVAO8oCmqwDCfzUnkuu23fm.0g7GdsL5atoKDuudz1wDW9D2S";
    const phoneNumber = "+380851748578";

    const result = await authService.sendActivationCode(
      activationToken,
      phoneNumber
    );

    expect(result).not.toBeUndefined();
  });

  test("activateUser", async () => {
    const activationCode = "123456";
    const result = await authService.activateUser(activationCode);
    expect(result.email).not.toBeUndefined();
    expect(result.token).not.toBeUndefined();
  });

  test("logout", async () => {
    const email = "test@mail.com";
    const result = await authService.logout(email);
    expect(result).not.toBeUndefined();
  });
});
