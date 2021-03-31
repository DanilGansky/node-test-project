const request = require("supertest");
const app = require("../../../../server");

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE2MTcxNzM2NTF9.m7MP5-GDjy_Kvw99Nv613BNC86QSpdulUakaz_8senc";

describe("adminAPI tests (integration tests)", () => {
  test("get all characters", async () => {
    const resp = await request(app)
      .get("/admin/characters")
      .set("Authorization", accessToken);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.characters).not.toBeUndefined();
  });

  test("get specific characters", async () => {
    const resp = await request(app)
      .get("/admin/characters/2")
      .set("Authorization", accessToken);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.character).not.toBeUndefined();
    expect(resp.body.character.id).toEqual(2);
  });
});
