const db = require("../../../domain/identity");
const {userExceptions} = require("../../../domain/identity/exceptions");

const findAll = async () => await db.User.findAll();

const findByEmail = async email => {
    const user = await db.User.findOne({
        where: {email: email}
    });

    if (!user) {
        return Promise.reject(userExceptions.UserNotFound);
    }
    return user;
};

const create = async (email, password) => {
    return await db.User.create({
        email: email,
        password: password,
    });
};

const activate = async user => {
    return await db.User.update({
        isActive: true
    }, {
        where: {id: user.id},
    });
};

module.exports = {
    findAll: findAll,
    findByEmail: findByEmail,
    create: create,
    activate: activate,
};