const sendMail = require("./email.service");

const sender = require("@sendgrid/mail");

test("sendMail", () => {
    const testEmail = "danylo.hanskyi@computools.com";
    return sendMail(testEmail).catch(e => {
        expect(e).toBeUndefined();
    });
});