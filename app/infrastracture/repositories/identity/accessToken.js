const db = require("../../../domain/identity");

const findByUserID = userID => {
    return db.AccessToken.findOne({
        where: { UserId: userID, }
    });
};

const findByEmail = email => {
    return db.AccessToken.findOne({
        include: {
            model: db.User,
            where: { email: email },
        },
    });
};

const create = (token, userID) => {
    return db.AccessToken.create({
        token: token,
        UserId: userID,
        isBlocked: false,
    });
};

const block = accessToken => {
    return db.AccessToken.update({
        isBlocked: true,
    }, {
        where: { UserId: accessToken.UserId, }
    });
};

module.exports = {
    findByUserID: findByUserID,
    create: create,
    block: block,
    findByEmail: findByEmail,
};