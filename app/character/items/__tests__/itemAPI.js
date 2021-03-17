const request = require("supertest");
const app = require("../../../../server");

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MTU1NDk5MjcsImRhdGEiOiJndWVzdEBtYWlsLmNvbSIsImlhdCI6MTYxNTU0NjMyN30._tePp7lYI4ZEs4WxVcETQ7YS3le0wPdVwod9X4gRXOs";

afterAll(async (done) => {
  app.close(done);
});

describe("itemAPI tests (integration tests)", () => {
  test("get all items", async () => {
    const resp = await request(app)
      .get("/admin/items")
      .set("Authorization", accessToken);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.items).not.toBeUndefined();
    expect(resp.body.items.length).toBeGreaterThanOrEqual(1);
  });

  test("create new item", async () => {
    const resp = await request(app)
      .post("/admin/items")
      .set("Authorization", accessToken)
      .send({
        name: "super item",
        icon: "some icon",
        params: [
          {
            StatId: 1,
            value: 123,
          },
        ],
      });

    expect(resp.statusCode).toEqual(201);
    expect(resp.body.item).not.toBeUndefined();
    expect(resp.body.item.name).toEqual("super item");
  });

  test("update item", async () => {
    const resp = await request(app)
      .put("/admin/items/1")
      .set("Authorization", accessToken)
      .send({
        name: "super item",
        icon: "some icon",
        params: [
          {
            StatId: 1,
            value: 123,
          },
        ],
      });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.item).not.toBeUndefined();
    expect(resp.body.item.name).toEqual("super item");
  });

  test("delete item", async () => {
    const resp = await request(app)
      .delete("/admin/items/1")
      .set("Authorization", accessToken);

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.item).not.toBeUndefined();
    expect(resp.body.item).toEqual(1);
  });
});
