const auth = require('./auth');
const checkTestUser = require('./checkTestUser');
const validation = require('./validation');
const ctrlWrapper = require('./ctrlWrapper');
const errorHandler = require('./errorHandler');
const upload = require('./upload');

module.exports = {
  auth,
  checkTestUser,
  validation,
  ctrlWrapper,
  errorHandler,
  upload,
};
