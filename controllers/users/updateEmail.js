const { Forbidden } = require('http-errors');

const { TEST_USER_ID } = process.env;
const { User } = require('../../models');

const updateEmail = async (req, res) => {
  const { _id } = req.user;
  const { email } = req.body;

  if (_id.toString() === TEST_USER_ID)
    throw new Forbidden('Sorry, you cannot change email for test user');

  const updatedUser = await User.findByIdAndUpdate(_id, { email }, { new: true });

  res.status(200).json({
    message: 'Email updated successfully',
    email: updatedUser.email,
  });
};

module.exports = updateEmail;
