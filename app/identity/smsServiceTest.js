const smsService = require("./smsService");

test("sendSMS", () => {
  const number = "+380962582171";
  return smsService.sendSMS(number).then((msg) => {
    expect(msg.sid).not.toBeUndefined();
  });
});
