const { Transaction, User } = require('../../models');
const removeOldAvatars = require('../../services/removeOldAvatars');

const deleteUser = async (req, res) => {
  const { _id } = req.user;

  await Transaction.deleteMany({ owner: _id });
  await User.deleteOne({ id: _id });
  await removeOldAvatars(_id);

  res.status(200).json({ message: 'User has been deleted' });
};

module.exports = deleteUser;
