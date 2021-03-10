const db = require("../../../domain/identity");
const {activationTokenExceptions} = require("../../../domain/identity/exceptions");

const findUserByToken = async token => {
    const activationToken = await db.ActivationToken.findOne({
        where: {token: token},
        include: db.User,
    });

    if (!activationToken) {
        return Promise.reject(activationTokenExceptions.ActivationTokenNotFound);
    }
    return activationToken.User;
};

const create = async (token, userID) => {
    return db.ActivationToken.create({
        token: token,
        UserId: userID,
    });
};

const remove = async userID => {
    const id = await db.ActivationToken.destroy({
        where: {UserId: userID},
    });

    if (!id) {
        return Promise.reject(activationTokenExceptions.ActivationTokenNotFound);
    }
    return id;
};

module.exports = {
    findUserByToken: findUserByToken,
    create: create,
    remove: remove,
};