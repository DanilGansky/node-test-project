const sender = require("nodemailer");
const bcrypt = require("bcrypt");
const {activationTokenRepository} = require("../repositories");
const {emailSenderConfig, appConfig} = require("../../config");

const sendMail = async (to, userID) => {
    const token = generateActivationToken(to);
    await activationTokenRepository.create(token, userID);

    const activationURL = generateActivationURL(token);
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
        text: `Confirm your account: ${activationURL}`,
    });
};

const generateActivationToken = email => {
    return bcrypt.hashSync(email, appConfig.SALT);
};

const generateActivationURL = token => {
    return `${appConfig.HOST}:${appConfig.PORT}/identity/activate?activationToken=${token}/`;
};

module.exports = {
    sendMail: sendMail,
};