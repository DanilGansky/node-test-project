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

module.exports = {
    UserNotFound: UserNotFound,
    InvalidCredentials: InvalidCredentials,
    UserAlreadyRegistered: UserAlreadyRegistered,
    InvalidPhoneNumber: InvalidPhoneNumber,
};