const path = require('path');
const multer = require('multer');

const tempDir = path.join(__dirname, '../', 'tmp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
  limits: {
    fileSize: 2048,
  },
});

const upload = multer({ storage });

module.exports = upload;
