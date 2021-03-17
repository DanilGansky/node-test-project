const itemRepository = require("../__mocks__/itemRepository");
const itemService = require("../itemService")(itemRepository);

describe("test itemService", () => {
  test("findAll", async () => {
    const items = await itemService.findAll();
    expect(items).not.toBeUndefined();
  });

  test("create", async () => {
    const body = {
      name: "item",
      icon: "icon",
      params: [
        {
          StatId: 123,
          value: 5,
        },
      ],
    };

    const item = await itemService.create(body);
    expect(item).not.toBeUndefined();
    expect(item.id).not.toBeUndefined();
    expect(item.name).not.toBeUndefined();
    expect(item.icon).not.toBeUndefined();
    expect(item.Parameters).not.toBeUndefined();
  });

  test("update", async () => {
    const body = {
      name: "item",
      icon: "icon",
      params: [
        {
          StatId: 123,
          value: 5,
        },
      ],
    };

    const item = await itemService.update(body, 123);
    expect(item).not.toBeUndefined();
    expect(item.id).not.toBeUndefined();
    expect(item.name).not.toBeUndefined();
    expect(item.icon).not.toBeUndefined();
    expect(item.Parameters).not.toBeUndefined();
  });

  test("remove", async () => {
    const result = await itemService.remove(123);
    expect(result).not.toBeUndefined();
  });
});
