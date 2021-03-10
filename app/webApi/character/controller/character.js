const {characterService} = require("../../../application/services/character");

const uploadAvatar = async (req, resp) => {
    const files = req.files;
    const buffer = Buffer.from(Object.values(files[0].buffer));

    try {
        const outPath = await characterService.uploadAvatar(buffer, files[0].originalname, req.user.id);
        resp.status(200).json({ outPath: outPath });
    } catch (e) {
        resp.status(500).json({ error: e });
    }
};

const setDescription = async (req, resp) => {
    const {description} = req.body;

    try {
        const character = await characterService.setDescription(description, req.user.id);
        resp.status(200).json({ character: character });
    } catch (e) {
        resp.status(500).json({ error: e });
    }
};

module.exports = {
    uploadAvatar: uploadAvatar,
    setDescription: setDescription,
};