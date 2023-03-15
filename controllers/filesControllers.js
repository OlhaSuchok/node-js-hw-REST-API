const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const avatarsDir = path.join(__dirname, "../public", "avatars");
const User = require("../service/schemas/users");
const avatars = [];

const uploadController = async (req, res) => {
  const { path: tempUpload, originalname } = req.file;

  const resultUpload = path.join(avatarsDir, originalname);

  console.log("req.file", req.file);
  console.log("originalname", originalname);
  console.log("path", tempUpload);
  console.log("req.user", req.user);

  await fs.rename(tempUpload, resultUpload);

  const cover = path.join("avatars", originalname);

  const newAvatar = {
    id: uuidv4(),
    ...req.body,
    cover,
  };

  avatars.push(newAvatar);

  res.json({
    status: "success",
    avatars,
  });
};

module.exports = {
  uploadController,
};
