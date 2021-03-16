require("dotenv").config();

const activationCodeRepository = require("../activation/activationCodeRepository");
const smsService = require("../smsService")(activationCodeRepository);
const db = require("../db");

const testEmail = "test@test.mail.com";
const testPassword = "12345678";
const testPhoneNumber = "+380962582171";
const userID = 1;

beforeAll(async () => {
  await db.User.create({
    id: userID,
    email: testEmail,
    password: testPassword,
  }).catch((e) => {
    console.error(e);
  });
});

afterAll(async () => {
  await db.ActivationCode.destroy({ truncate: true });
  await db.User.destroy({ truncate: true, cascade: true });
  await db.sequelize.close();
});

describe("sending sms (integration test)", () => {
  test("sendSMS", async () => {
    const data = await smsService.sendSMS(testPhoneNumber, userID);
    expect(data.sid).not.toBeUndefined();
  });
});
