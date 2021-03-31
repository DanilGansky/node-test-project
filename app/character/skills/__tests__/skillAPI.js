const request = require("supertest");
const app = require("../../../../server");

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE2MTcxNzM2NTF9.m7MP5-GDjy_Kvw99Nv613BNC86QSpdulUakaz_8senc";

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
        name: "updated skill",
        params: [
          {
            StatId: 1,
            value: 123,
          },
        ],
      });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.skill).not.toBeUndefined();
    expect(resp.body.skill.name).toEqual("updated skill");
  });

  test("delete skill", async () => {
    const resp = await request(app)
      .delete("/admin/skills/1")
      .set("Authorization", accessToken);

    expect(resp.statusCode).toEqual(204);
  });
});
