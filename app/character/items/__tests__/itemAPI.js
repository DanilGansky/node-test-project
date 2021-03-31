const request = require("supertest");
const app = require("../../../../server");

const accessToken =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoiYWRtaW5AbWFpbC5jb20iLCJpYXQiOjE2MTcxNzM2NTF9.m7MP5-GDjy_Kvw99Nv613BNC86QSpdulUakaz_8senc";

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
        name: "updated item",
        params: [
          {
            StatId: 1,
            value: 123,
          },
        ],
      });

    expect(resp.statusCode).toEqual(200);
    expect(resp.body.item).not.toBeUndefined();
    expect(resp.body.item.name).toEqual("updated item");
  });

  test("delete item", async () => {
    const resp = await request(app)
      .delete("/admin/items/1")
      .set("Authorization", accessToken);

    expect(resp.statusCode).toEqual(204);
  });
});
