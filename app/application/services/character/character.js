const {characterRepository} = require("../../../infrastracture/repositories/character");
const {characterExceptions} = require("../../../domain/character/exceptions");
const {uploadService} = require("../uploading");
const {appConfig} = require("../../../config");

const findByID = async userID => await characterRepository.findByUserID(userID);

const uploadAvatar = async (data, filename, userID) => {
    const character = await characterRepository.findByUserID(userID);
    const filePath = await uploadService.upload(data, filename);
    const avatarURL = getAvatarURL(filePath);
    await characterRepository.update({avatar: avatarURL}, character.id);
    return avatarURL;
};

const setDescription = async (description, userID) => {
    const character = await characterRepository.findByUserID(userID);
    await characterRepository.update({description: description}, character.id);
    return await characterRepository.findByUserID(character.id);
};

const updateCharacter = async (data, userID) => {
    const dataToUpdate = getDataToUpdate(data);
    if (!dataToUpdate) {
        return Promise.reject(characterExceptions.InvalidCharacter);
    }

    const character = await characterRepository.findByUserID(userID);
    // todo: update stats
    await characterRepository.update(dataToUpdate, character.id);
    return await characterRepository.findByUserID(character.id);
};

const getAvatarURL = filePath => {
    const dirs = filePath.split("/");
    return `http://${appConfig.HOST}:${appConfig.PORT}/media/${dirs[dirs.length-1]}`;
};

const getDataToUpdate = (data) => {
    const {strength, agility, endurance, intelligence} = data;
    const result = {};
    if (strength) {
        result.strength = strength;
    }
    if (agility) {
        result.agility = agility;
    }
    if (endurance) {
        result.endurance = endurance;
    }
    if (intelligence) {
        result.intelligence = intelligence;
    }
    return data;
};

module.exports = {
    findByID: findByID,
    uploadAvatar: uploadAvatar,
    setDescription: setDescription,
    updateCharacter: updateCharacter,
};