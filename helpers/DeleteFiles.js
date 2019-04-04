const fs = require("fs");
const path = require("path");

const deleteFileFromPublicImages = async (fileName, callback) => {
  console.log(path.join(__dirname, "../client/public/images/") + fileName);
  await fs.unlink(
    path.join(__dirname, "../client/public/images/") + fileName,
    callback
  );
};

module.exports = { deleteFileFromPublicImages };
