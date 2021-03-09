const sendSMS = require("./sms.service");

test("sendSMS", () => {
    const number = "+380962582171";
    return sendSMS(number).then(msg => {
        expect(msg.sid).not.toBeUndefined();
    });
});