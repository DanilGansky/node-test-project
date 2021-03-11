const emailService = require("./emailService");

test("sendMail", () => {
  const testEmail = "danylo.hanskyi@computools.com";
  return emailService.sendMail(testEmail).catch((e) => {
    expect(e).toBeUndefined();
  });
});
