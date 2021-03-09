const sender = require("nodemailer");
const bcrypt = require("bcrypt");
const { activationTokenRepository } = require("../repositories");
const { emailSenderConfig, appConfig } = require("../../config");

const sendMail = async (to, userID) => {
    const hashedEmail = hashEmail(to);
    await activationTokenRepository.createActivationToken(hashedEmail, userID);
    const transporter = sender.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: emailSenderConfig.USER,
            pass: emailSenderConfig.PASS,
        }
    });

    return transporter.sendMail({
        to: to,
        from: emailSenderConfig.SENDER,
        subject: "Account confirmation",
        text: `Confirm your account: ${hashedEmail}`,
    });
};

const hashEmail = email => {
    return bcrypt.hashSync(email, appConfig.SALT);
};

module.exports = {
    sendMail: sendMail,
};