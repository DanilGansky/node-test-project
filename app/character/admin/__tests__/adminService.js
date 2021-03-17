const characterRepository = require("../../__mocks__/characterRepository");
const adminService = require("../adminService")(characterRepository);

describe("test adminService (unit test)", () => {
  test("findAll", async () => {
    const characters = await adminService.findAll();
    expect(characters).not.toBeUndefined();
  });

  test("findByID", async () => {
    const params = { id: 123 };
    const character = await adminService.findByID(params);
    expect(character).not.toBeUndefined();
  });
});
