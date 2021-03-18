const request = require("supertest");
const app = require("../../../server");

const testCode = 123456;
const testEmail = "test@mail.com";
const testEmailForCreating = "test@mail.test.com";
const testPassword = "12345678";
const testPhoneNumber = "+380962582171";
const testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTU1NDk5MjcsImRhdGEiOiJndWVzdEBtYWlsLmNvbSIsImlhdCI6MTYxNTU0NjMyN30._tePp7lYI4ZEs4WxVcETQ7YS3le0wPdVwod9X4gRXOd";

describe("testing identity API (integration tests)", () => {
  test("register", async () => {
    const resp = await request(app).post("/identity/register").send({
      email: testEmailForCreating,
      password: testPassword,
    });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.user.email).toEqual(testEmailForCreating);
  });

  test("sending activation code", async () => {
    const resp = await request(app)
      .post("/identity/send-activation-code")
      .send({
        activationToken: testToken,
        phoneNumber: testPhoneNumber,
      });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.result).not.toBeUndefined();
  });

  test("activating", async () => {
    const resp = await request(app).post("/identity/activate").send({
      activationCode: testCode,
    });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.result).not.toBeUndefined();
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

  test("logout", async () => {
    const resp = await request(app).post("/identity/logout").send({
      email: testEmail,
    });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.result).toEqual(testEmail);
  });
});
