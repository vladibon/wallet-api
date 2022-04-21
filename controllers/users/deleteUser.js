const { Forbidden } = require('http-errors');

const removeOldAvatars = require('../../services/removeOldAvatars');
const { TEST_USER_ID } = process.env;
const { Transaction, User } = require('../../models');

const deleteUser = async (req, res) => {
  const { _id } = req.user;

  if (_id.toString() === TEST_USER_ID) throw new Forbidden('Sorry, you cannot delete test user');

  await Transaction.deleteMany({ owner: _id });
  await User.deleteOne({ id: _id });
  await removeOldAvatars(_id);

  res.status(200).json({ message: 'User has been deleted' });
};

module.exports = deleteUser;
