const request = require("supertest");
const app = require("../../../server");

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTU1NDk5MjcsImRhdGEiOiJndWVzdEBtYWlsLmNvbSIsImlhdCI6MTYxNTU0NjMyN30._tePp7lYI4ZEs4WxVcETQ7YS3le0wPdVwod9X4gRXOs";

describe("characterAPI tests (integration tests)", () => {
  test("me", async () => {
    const resp = await request(app)
      .get("/character/me")
      .set("Authorization", accessToken);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.character).not.toBeUndefined();
  });

  test("update", async () => {
    const resp = await request(app)
      .put("/character/update")
      .set("Authorization", accessToken)
      .send({ agility: 100 });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.character).not.toBeUndefined();

    const agilityStat = resp.body.character.Stats.filter(
      (s) => s.name === "agility"
    )[0];

    expect(agilityStat.CharacterStats.value).toEqual(100);
  });

  test("update description", async () => {
    const resp = await request(app)
      .put("/character/update-description")
      .set("Authorization", accessToken)
      .send({ description: "cool character" });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.character).not.toBeUndefined();
    expect(resp.body.character.description).toEqual("cool character");
  });

  test("upload avatar", async () => {
    const resp = await request(app)
      .put("/character/upload-avatar")
      .type("multipart/form-data")
      .set("Authorization", accessToken)
      .attach("f", "/home/dev/Dev/node-sample/media/test.jpg");

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.outPath).not.toBeUndefined();
  });

  test("set skills", async () => {
    const resp = await request(app)
      .put("/character/set-skills")
      .set("Authorization", accessToken)
      .send({
        skillIDs: [1, 2, 3],
      });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.character.Skills).not.toBeUndefined();
    expect(resp.body.character.Skills.length).toBeGreaterThan(0);
  });

  test("set items", async () => {
    const resp = await request(app)
      .put("/character/set-items")
      .set("Authorization", accessToken)
      .send({
        itemIDs: [1],
      });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.character.Items).not.toBeUndefined();
    expect(resp.body.character.Items.length).toBeGreaterThan(0);
  });

  test("get character stats", async () => {
    const resp = await request(app)
      .get("/character/stats")
      .set("Authorization", accessToken);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.stats).not.toBeUndefined();
  });
});
