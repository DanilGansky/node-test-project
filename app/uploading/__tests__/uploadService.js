const path = require("path");
const fs = require("fs");
const { upload } = require("../uploadService");

test("upload", async () => {
  const filename = "test.jpg";
  const readPath = path.join(__dirname, `../../../media/${filename}`);
  const stream = fs.createReadStream(readPath);
  stream.setEncoding("base64");

  let data = "";
  stream.on("data", (chunk) => {
    data += chunk;
  });

  stream.on("error", (e) => {
    console.error(e);
  });

  stream.on("end", async () => {
    const outPath = await upload(data, filename);
    expect(outPath).not.toEqual("");
  });
});
