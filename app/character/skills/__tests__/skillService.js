const skillRepository = require("../__mocks__/skillRepository");
const skillService = require("../skillService")(skillRepository);

describe("test skillService", () => {
  test("findAll", async () => {
    const skills = await skillService.findAll();
    expect(skills).not.toBeUndefined();
  });

  test("create", async () => {
    const body = {
      name: "skill",
      params: [
        {
          StatId: 123,
          value: 5,
        },
      ],
    };

    const skill = await skillService.create(body);
    expect(skill).not.toBeUndefined();
    expect(skill.id).not.toBeUndefined();
    expect(skill.name).not.toBeUndefined();
    expect(skill.Parameters).not.toBeUndefined();
  });

  test("update", async () => {
    const body = {
      name: "skill",
      params: [
        {
          StatId: 123,
          value: 5,
        },
      ],
    };

    const skill = await skillService.update(body, 123);
    expect(skill).not.toBeUndefined();
    expect(skill.id).not.toBeUndefined();
    expect(skill.name).not.toBeUndefined();
    expect(skill.Parameters).not.toBeUndefined();
  });

  test("remove", async () => {
    const result = await skillService.remove(123);
    expect(result).not.toBeUndefined();
  });
});
