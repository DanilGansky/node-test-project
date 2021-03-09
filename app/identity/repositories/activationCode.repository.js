const db = require("../models");
const { activationCodeExceptions } = require("../models/exceptions");

const findUserByCode = async code => {
    const activationCode = await db.ActivationCode.findOne({
        where: { code: code },
        include: db.User,
    });

    if (!activationCode) {
        return Promise.reject(activationCodeExceptions.ActivationCodeNotFound);
    }
    return activationCode.User;
};

const createActivationCode = async (code, userID) => {
    return db.ActivationCode.create({
        code: code,
        UserId: userID,
    });
};

const deleteActivationCode = async code => {
    const id = await db.ActivationCode.destroy({
        where: { code: code },
    });

    if (!id) {
        return Promise.reject(activationCodeExceptions.ActivationCodeNotFound);
    }
    return id;
};

module.exports = {
    findUserByCode: findUserByCode,
    createActivationCode: createActivationCode,
    deleteActivationCode: deleteActivationCode,
};