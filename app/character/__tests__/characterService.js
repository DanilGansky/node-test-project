const characterRepository = require("../__mocks__/characterRepository");
const skillRepository = require("../skills/__mocks__/skillRepository");
const itemRepository = require("../items/__mocks__/itemRepository");
const updateService = require("../__mocks__/uploadService");
const statRepository = require("../__mocks__/statRepository");
const characterService = require("../characterService")(
  characterRepository,
  skillRepository,
  itemRepository,
  updateService,
  statRepository
);

describe("test characterService (unit test)", () => {
  test("create", async () => {
    const character = await characterService.create(123);
    expect(character).not.toBeUndefined();
    expect(character.id).not.toBeUndefined();
    expect(character.UserId).not.toBeUndefined();
  });

  test("findByID", async () => {
    const character = await characterService.findByID(123);
    expect(character).not.toBeUndefined();
    expect(character.id).not.toBeUndefined();
    expect(character.UserId).not.toBeUndefined();
  });

  test("uploadAvatar", async () => {
    const avatarURL = await characterService.uploadAvatar({}, "file", 123);
    expect(avatarURL).not.toBeUndefined();
  });

  test("setDescription", async () => {
    const description = "nice character";
    const character = await characterService.setDescription(description, 123);
    expect(character).not.toBeUndefined();
    expect(character.id).not.toBeUndefined();
    expect(character.UserId).not.toBeUndefined();
  });

  test("update", async () => {
    const data = { stat: 5 };
    const userID = 123;

    const character = await characterService.update(data, userID);
    expect(character).not.toBeUndefined();
    expect(character.id).not.toBeUndefined();
    expect(character.UserId).not.toBeUndefined();
  });

  test("setSkills", async () => {
    const skillIDs = [1, 2, 3];
    const userID = 123;

    const character = await characterService.setSkills(skillIDs, userID);
    expect(character).not.toBeUndefined();
    expect(character.id).not.toBeUndefined();
    expect(character.UserId).not.toBeUndefined();
  });

  test("setItems", async () => {
    const itemIDs = [1, 2, 3];
    const userID = 123;

    const character = await characterService.setItems(itemIDs, userID);
    expect(character).not.toBeUndefined();
    expect(character.id).not.toBeUndefined();
    expect(character.UserId).not.toBeUndefined();
  });

  test("getStats", async () => {
    const stats = await characterService.getStats(123);
    expect(stats).not.toBeUndefined();
  });
});
