const fs = require('fs/promises');
const FS = require('fs');
const path = require('path');

async function removeOldAvatars(_id) {
  const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

  FS.readdir(avatarsDir, function (err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    files.forEach(async function (file) {
      if (file.split('.')[0] === _id.toString()) {
        await fs.unlink(path.join(avatarsDir, file));
      }
    });
  });
}

module.exports = removeOldAvatars;
