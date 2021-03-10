const {characterRepository} = require("../../../infrastracture/repositories/character");
const {uploadService} = require("../uploading");
const {appConfig} = require("../../../config");

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

const getAvatarURL = filePath => {
    const dirs = filePath.split("/");
    return `${appConfig.HOST}:${appConfig.PORT}/media/${dirs[dirs.length-1]}`;
};

module.exports = {
    uploadAvatar: uploadAvatar,
    setDescription: setDescription,
};