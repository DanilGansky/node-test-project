const request = require("supertest");
const app = require("../../../../server");

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTU1NDk5MjcsImRhdGEiOiJndWVzdEBtYWlsLmNvbSIsImlhdCI6MTYxNTU0NjMyN30._tePp7lYI4ZEs4WxVcETQ7YS3le0wPdVwod9X4gRXOs";

afterAll(async (done) => {
  app.close(done);
});

describe("adminAPI tests (integration tests)", () => {
  test("get all characters", async () => {
    const resp = await request(app)
      .get("/admin/characters")
      .set("Authorization", accessToken);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.characters).not.toBeUndefined();
    expect(resp.body.characters.length).toBeGreaterThan(1);
  });

  test("get specific characters", async () => {
    const resp = await request(app)
      .get("/admin/characters/1")
      .set("Authorization", accessToken);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.character).not.toBeUndefined();
    expect(resp.body.character.id).toEqual(1);
  });
});
