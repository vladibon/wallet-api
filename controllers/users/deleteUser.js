const { Transaction, User } = require('../../models');

const deleteUser = async (req, res) => {
  const { _id } = req.user;
  await Transaction.deleteMany({ owner: _id });
  await User.deleteOne({ id: _id });
  res.json({ message: 'Done' });
};

module.exports = deleteUser;
