const {characterExceptions} = require("../../../domain/character/exceptions");
const db = require("../../../domain/character");

const findByUserID = async userID => {
    const character = await db.Character.findOne({
        where: {UserId: userID},
        include: [{
            model: db.Skill,
            through: {attributes: []}
        }, {
            model: db.Item,
            through: {attributes: []}
        },]
    });

    if (!character) {
        return Promise.reject(characterExceptions.CharacterNotFound);
    }
    return character;
};

const create = data => {
    return db.Character.create(data);
};

const update = (data, id) => {
    return db.Character.update(data, {
        where: {id: id}
    });
};

module.exports = {
    findByUserID: findByUserID,
    create: create,
    update: update,
};