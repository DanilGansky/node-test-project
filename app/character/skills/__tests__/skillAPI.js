const request = require("supertest");
const app = require("../../../../server");

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTU1NDk5MjcsImRhdGEiOiJndWVzdEBtYWlsLmNvbSIsImlhdCI6MTYxNTU0NjMyN30._tePp7lYI4ZEs4WxVcETQ7YS3le0wPdVwod9X4gRXOs";

afterAll(async (done) => {
  app.close(done);
});

describe("skillAPI tests (integration tests)", () => {
  test("get all skills", async () => {
    const resp = await request(app)
      .get("/admin/skills")
      .set("Authorization", accessToken);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.skills).not.toBeUndefined();
    expect(resp.body.skills.length).toBeGreaterThanOrEqual(1);
  });

  test("create new skill", async () => {
    const resp = await request(app)
      .post("/admin/skills")
      .set("Authorization", accessToken)
      .send({
        name: "super skill",
        params: [
          {
            StatId: 1,
            value: 123,
          },
        ],
      });

    expect(resp.statusCode).toEqual(201);
    expect(resp.body.skill).not.toBeUndefined();
    expect(resp.body.skill.name).toEqual("super skill");
  });

  test("update skill", async () => {
    const resp = await request(app)
      .put("/admin/skills/1")
      .set("Authorization", accessToken)
      .send({
        name: "super skill",
        params: [
          {
            StatId: 1,
            value: 123,
          },
        ],
      });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.skill).not.toBeUndefined();
    expect(resp.body.skill.name).toEqual("super skill");
  });

  test("delete skill", async () => {
    const resp = await request(app)
      .delete("/admin/skills/1")
      .set("Authorization", accessToken);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.skill).not.toBeUndefined();
    expect(resp.body.skill).toEqual(1);
  });
});
