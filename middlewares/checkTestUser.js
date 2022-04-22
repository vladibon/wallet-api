const { Forbidden } = require('http-errors');
const { TEST_USER_ID } = process.env;

const checkTestUser = async (req, _, next) => {
  const { _id } = req.user;

  try {
    if (String(_id) === TEST_USER_ID)
      throw new Forbidden('Sorry, you are not allowed to make these changes');
  } catch (error) {
    next(error);
  }
};

module.exports = checkTestUser;
