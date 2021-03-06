const { appConfig } = require("../config");
const jwt = require("jsonwebtoken");
const identityEvents = require("./idenityEvents");
const bcrypt = require("bcrypt");

const userExceptions = require("./users/userExceptions");
const activationCodeExceptions = require("./activation/activationCodeExceptions");

let emailService;
let smsService;
let eventSenderService;
let userRepository;
let activationTokenRepository;
let accessTokenRepository;
let activationCodeRepository;

const register = async (credentials) => {
  const { email, password } = credentials;
  if (!isValidCredentials(email, password)) {
    return Promise.reject(userExceptions.InvalidCredentials);
  }

  try {
    const userByEmail = await userRepository.findByEmail(email);
    if (userByEmail) {
      return Promise.reject(userExceptions.UserAlreadyRegistered);
    }
  } catch (e) {
    if (e.name === "SequelizeDatabaseError") {
      return Promise.reject(e);
    }
    if (e.name !== "UserNotFound") {
      return Promise.reject(userExceptions.UserAlreadyRegistered);
    }
  }

  const passwordHash = bcrypt.hashSync(password, appConfig.SALT);
  const user = await userRepository.create(email, passwordHash);

  await emailService.sendMail(email, user.id);
  eventSenderService.sendEvent(new identityEvents.UserRegistered(user.id));
  return user;
};

const login = async (credentials) => {
  const { email, password, phoneNumber } = credentials;
  if (!isValidCredentials(email, password)) {
    return Promise.reject(userExceptions.InvalidCredentials);
  }
  if (!isValidPhoneNumber(phoneNumber)) {
    return Promise.reject(userExceptions.InvalidCredentials);
  }

  const user = await userRepository.findByEmail(email);
  if (!user.isActive) {
    return Promise.reject(userExceptions.UserNotActivated);
  }

  const passwordHash = bcrypt.hashSync(password, appConfig.SALT);
  if (passwordHash !== user.password) {
    return Promise.reject(userExceptions.InvalidCredentials);
  }

  await userRepository.updateLastLoginDate(user);
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

const activateUser = async (activationCode) => {
  let user;

  try {
    user = await activationCodeRepository.findUserByCode(activationCode);
  } catch (e) {
    return Promise.reject(activationCodeExceptions.InvalidActivationCode);
  }

  if (!user.isActive) {
    await userRepository.activate(user);
  }

  try {
    await activationCodeRepository.remove(activationCode);
    await activationTokenRepository.remove(user.id);
  } catch (e) {
    console.warn(e);
  }

  const token = generateAccessToken(user.email);
  await accessTokenRepository.create(token, user.id);
  return { email: user.email, token: token };
};

const logout = async (email) => {
  const user = await userRepository.findByEmail(email);

  try {
    const accessToken = await accessTokenRepository.findByUserID(user.id);
    if (!accessToken.isBlocked) {
      await accessTokenRepository.block(accessToken);
    }
  } catch (e) {
    return Promise.reject(userExceptions.UserIsNotLoggedIn);
  }

  return email;
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

const isValidPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) {
    return false;
  }
  return phoneNumber.match(
    /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/im
  );
};

const generateAccessToken = (email) => {
  return jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 1440 * 1440, // 1 day
      data: email,
    },
    appConfig.SECRET
  );
};

module.exports = (
  emailSender,
  smsSender,
  userRepo,
  eventSender,
  activationTokenRepo,
  accessTokenRepo,
  activationCodeRepo
) => {
  emailService = emailSender;
  smsService = smsSender;
  userRepository = userRepo;
  eventSenderService = eventSender;
  activationTokenRepository = activationTokenRepo;
  accessTokenRepository = accessTokenRepo;
  activationCodeRepository = activationCodeRepo;

  return {
    register: register,
    sendActivationCode: sendActivationCode,
    activateUser: activateUser,
    login: login,
    logout: logout,
  };
};
