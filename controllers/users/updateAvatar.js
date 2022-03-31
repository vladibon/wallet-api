const path = require('path');
const Jimp = require('jimp');
const fs = require('fs/promises');
const { User } = require('../../models');

const avatarsDir = path.resolve('./public/avatars');

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempPath, originalname } = req.file;

  const imageName = `${_id}_${originalname}`;
  const uploadPath = path.join(avatarsDir, imageName);
  const avatarURL = path.join('public', 'avatars', imageName);

  const file = await Jimp.read(tempPath);
  file.resize(250, 250).write(uploadPath);

  await fs.unlink(tempPath);

  await User.findByIdAndUpdate(_id, { avatarURL });

  res.json({ avatarURL });
};

module.exports = updateAvatar;
