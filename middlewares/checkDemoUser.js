const { Forbidden } = require('http-errors');
const { TEST_USER_ID } = process.env;

const checkDemoUser = async (req, _, next) => {
  const { _id } = req.user;

  try {
    if (String(_id) === TEST_USER_ID)
      throw new Forbidden(`Sorry, demo version doesn't support this feature`);
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = checkDemoUser;
