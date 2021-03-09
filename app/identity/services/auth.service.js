const { userExceptions, activationCodeExceptions } = require("../models/exceptions");
const { userRepository, activationCodeRepository, activationTokenRepository } = require("../repositories");
const { appConfig } = require("../../config");
const emailService = require("./email.service");
const smsService = require("./sms.service");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async credentials => {
    const { email, password } = credentials;
    if (!isValidCredentials(email, password)) {
        return Promise.reject(userExceptions.InvalidCredentials);
    }

    try {
        const userByEmail = await userRepository.findUserByEmail(email);
        if (userByEmail) {
            return Promise.reject(userExceptions.UserAlreadyRegistered);
        }
    } catch (e) {
        if (e.name !== "UserNotFound") {
            return Promise.reject(userExceptions.UserAlreadyRegistered);
        }
    }

    const passwordHash = bcrypt.hashSync(password, appConfig.SALT);
    const user = await userRepository.createUser(email, passwordHash);

    await emailService.sendMail(email, user.id);
    return user;
};

const login = async credentials => {
    const { email, password, phoneNumber } = credentials;
    if (!isValidCredentials(email, password)) {
        return Promise.reject(userExceptions.InvalidCredentials);
    }
    if (!isValidPhoneNumber(phoneNumber)) {
        return Promise.reject(userExceptions.InvalidCredentials);
    }

    const user = await userRepository.findUserByEmail(email);
    if (!user.isActive) {
        return Promise.reject(userExceptions.UserNotActivated);
    }

    const passwordHash = bcrypt.hashSync(password, appConfig.SALT);
    if (passwordHash !== user.password) {
        return Promise.reject(userExceptions.InvalidCredentials);
    }

    const result = await smsService.sendSMS(phoneNumber, user.id);
    return `message ${result.sid} is ${result.status}`;
};

const sendActivationCode = async (activationToken, phoneNumber) => {
    if (!isValidPhoneNumber(phoneNumber)) {
        return Promise.reject(userExceptions.InvalidPhoneNumber);
    }

    const user = await activationTokenRepository.findUserByToken(activationToken);
    const result = await smsService.sendSMS(phoneNumber, user.id);
    return `message ${result.sid} is ${result.status}`;
};

const activateUser = async activationCode => {
    let user;

    try {
        user = await activationCodeRepository.findUserByCode(activationCode);
    } catch (e) {
        return Promise.reject(activationCodeExceptions.InvalidActivationCode);
    }

    try {
        await userRepository.activateUser(user);
        await activationCodeRepository.deleteActivationCode(activationCode);
        await activationTokenRepository.deleteActivationTokenByUserID(user.id);
    } catch (e) {
        console.warn(e);
    }

    const token = jwt.sign({ email: user.email }, appConfig.SECRET);
    return { email: user.email, token: token };
};

const isValidCredentials = (email, password) => {
    if (!email || !password) {
        return false;
    }
    if (password.length < 4) {
        return false;
    }
    return email.match(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i);
};

const isValidPhoneNumber = phoneNumber => {
    if (!phoneNumber) {
        return false;
    }
    return phoneNumber.match(/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im);
};

module.exports = {
    register: register,
    sendActivationCode: sendActivationCode,
    authorize: activateUser,
    login: login,
};