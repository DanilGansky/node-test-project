const request = require("supertest");
const app = require("../../../server");

const testCode = 123456;
const testEmail = "admin@mail.com";
const testEmailForCreating = "test@mail.test.com";
const testPassword = "12345678";
const testPhoneNumber = "+380962582171";
const testToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE2MTcwMjkzNzV9.ch_DcjTpR-aaUOX0fMScBxT1hMMqZxkBexIDGgpfNlM";

describe("testing identity API (integration tests)", () => {
  test("register", async () => {
    const resp = await request(app).post("/identity/register").send({
      email: testEmailForCreating,
      password: testPassword,
    });

    expect(resp.statusCode).toEqual(200);
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
    const resp = await request(app)
      .post("/identity/logout")
      .set("Authorization", testToken)
      .send();

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.result).toEqual(testEmail);
  });
});
