require("dotenv").config();

const activationTokenRepository = require("../activation/activationTokenRepository");
const emailSender = require("../emailService")(activationTokenRepository);
const db = require("../db");

const testEmail = "test@test.mail.com";
const testPassword = "12345678";
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
  await db.ActivationToken.destroy({ truncate: true });
  await db.User.destroy({ truncate: true, cascade: true });
  await db.sequelize.close();
});

describe("Sending email (integration test)", () => {
  test("sendMail", async () => {
    const data = await emailSender.sendMail(testEmail, userID);
    expect(data.messageId).not.toBeUndefined();
  });
});
