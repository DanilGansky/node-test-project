const fs = require("fs");
const path = require("path");

const getUploadPath = (filename) => {
  const nameAndExt = filename.split(".");
  return path.join(
    __dirname,
    `../../media/${nameAndExt[0]}_${Date.now()}.${nameAndExt[1]}`
  );
};

const upload = (data, filename) => {
  const outPath = getUploadPath(filename);
  const stream = fs.createWriteStream(outPath);

  stream.write(data, "binary");
  stream.on("finish", () => {
    console.info("image uploaded");
  });

  stream.on("error", (e) => {
    console.error(`error during upload: ${e}`);
  });

  stream.end();
  return outPath;
};

module.exports = {
  upload,
  getUploadPath,
};
