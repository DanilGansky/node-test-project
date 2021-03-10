const UserNotFound = {
    name: "UserNotFound",
    message: "user with this email not found",
};

const InvalidCredentials = {
    name: "InvalidCredentials",
    message: "email or password are invalid",
};

const UserAlreadyRegistered = {
    name: "UserAlreadyRegistered",
    message: "user with this password already exists",
};

const InvalidPhoneNumber = {
    name: "InvalidPhoneNumber",
    message: "invalid phone number",
};

const UserNotActivated = {
    name: "UserNotActivated",
    message: "user not activated",
};

const UserIsNotLoggedIn = {
    name: "UserIsNotLoggedIn",
    message: "user is not logged in",
};

module.exports = {
    UserNotFound: UserNotFound,
    InvalidCredentials: InvalidCredentials,
    UserAlreadyRegistered: UserAlreadyRegistered,
    InvalidPhoneNumber: InvalidPhoneNumber,
    UserNotActivated: UserNotActivated,
    UserIsNotLoggedIn: UserIsNotLoggedIn,
};