const db = require("../models");
const { userExceptions } = require("../models/exceptions");

const findAllUsers = async () => await db.User.findAll();

const findUserByEmail = async email => {
    const user = await db.User.findOne({
        where: { email: email }
    });

    if (!user) {
        return Promise.reject(userExceptions.UserNotFound);
    }
    return user;
};

const createUser = async (email, password) => {
    return await db.User.create({
        email: email,
        password: password,
    });
};

const activateUser = async user => {
    return await db.User.update({
        isActive: true
    }, {
        where: { id: user.id },
    });
};

module.exports = {
    findAllUsers: findAllUsers,
    findUserByEmail: findUserByEmail,
    createUser: createUser,
    activateUser: activateUser,
};