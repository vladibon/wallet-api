const auth = require('./auth');
const validation = require('./validation');
const ctrlWrapper = require('./ctrlWrapper');
const errorHandler = require('./errorHandler');
const upload = require('./upload');

module.exports = {
  auth,
  validation,
  ctrlWrapper,
  errorHandler,
  upload,
};
