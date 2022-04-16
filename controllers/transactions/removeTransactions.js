const { Transaction, User } = require('../../models');

const removeTransactions = async (req, res) => {
  const { _id } = req.user;

  const { deletedCount } = await Transaction.deleteMany({ owner: _id });

  await User.findByIdAndUpdate(_id, { balance: 0, totalTransactions: 0 });

  res.json({ message: `${deletedCount} transactions have been deleted` });
};

module.exports = removeTransactions;
