const request = require("supertest");
const app = require("../../../server");

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidGVzdEBtYWlsLmNvbSIsImlhdCI6MTYxNzAyOTMyNn0.tw0u3h9A1UZETKZBZTGKgYUGrj7ef_GSY22YIIVcq6I";

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
      .attach("f", "./media/test.jpg");

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.character).not.toBeUndefined();
  });

  test("set skills", async () => {
    const resp = await request(app)
      .put("/character/set-skills")
      .set("Authorization", accessToken)
      .send({
        skillIDs: [3],
      });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.character.skills).not.toBeUndefined();
    expect(resp.body.character.skills.length).toBeGreaterThan(0);
  });

  test("set items", async () => {
    const resp = await request(app)
      .put("/character/set-items")
      .set("Authorization", accessToken)
      .send({
        itemIDs: [2],
      });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.character.items).not.toBeUndefined();
    expect(resp.body.character.items.length).toBeGreaterThan(0);
  });

  test("get character stats", async () => {
    const resp = await request(app)
      .get("/character/stats")
      .set("Authorization", accessToken);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.stats).not.toBeUndefined();
  });
});
