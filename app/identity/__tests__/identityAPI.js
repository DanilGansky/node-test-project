const request = require("supertest");
const app = require("../../../server");
const db = require("../db");

const testEmail = "test@mail.test.com";
const testPassword = "12345678";
const testPhoneNumber = "+380962582171";

afterAll(async () => {
  try {
    // await db.ActivationCode.destroy({ truncate: true });
    // await db.ActivationToken.destroy({ truncate: true });
    // await db.AccessToken.destroy({ truncate: true });
    // await db.User.destroy({ truncate: true, cascade: true });
  } finally {
    await db.sequelize.close();
  }
});

describe("testing identity API (integration tests)", () => {
  test("register", async () => {
    const resp = await request(app).post("/identity/register").send({
      email: testEmail,
      password: testPassword,
    });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.user.email).toEqual(testEmail);
  });

  test("login", async () => {
    const resp = await request(app).post("/identity/login").send({
      email: testEmail,
      password: testPassword,
      phoneNumber: testPhoneNumber,
    });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.result).not.toBeUndefined();
  });
});
