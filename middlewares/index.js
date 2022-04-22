const auth = require('./auth');
const checkDemoUser = require('./checkDemoUser');
const validation = require('./validation');
const ctrlWrapper = require('./ctrlWrapper');
const errorHandler = require('./errorHandler');
const upload = require('./upload');

module.exports = {
  auth,
  checkDemoUser,
  validation,
  ctrlWrapper,
  errorHandler,
  upload,
};
