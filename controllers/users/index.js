const signup = require('./signup');
const login = require('./login');
const verify = require('./verify');
const repeatVerify = require('./repeatVerify');
const getCurrent = require('./getCurrent');
const logout = require('./logout');
const updateSubscription = require('./updateSubscription');
const updateAvatar = require('./updateAvatar');

module.exports = {
  signup,
  login,
  verify,
  repeatVerify,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
};
