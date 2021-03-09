const { uploader } = require("../services");

const upload = async (req, resp, next) => {
    const files = req.files;
    const buffer = Buffer.from(Object.values(files[0].buffer));

    try {
        const outPath = await uploader.upload(buffer, files[0].originalname);
        resp.status(200).json({ outPath: outPath });
    } catch (e) {
        resp.status(500).json({ error: e });
    }
};

module.exports = upload;