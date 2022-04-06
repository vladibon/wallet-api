const { Transaction, User } = require('../../models');

const addTransaction = async (req, res) => {
  const { _id } = req.user;
  const { amount, type } = req.body;

  const user = await User.findById(_id);

  user.setBalance(type ? user.balance + amount : user.balance - amount).save();

  await Transaction.create({
    ...req.body,
    owner: _id,
    balance: user.balance,
  });

  const skip = 0;
  const limit = 8;
  const transactions = await Transaction.find(
    { owner: _id },
    { owner: 0 },
    { skip, limit },
  ).populate('owner', 'email');
  const result = { transactions, balance: user.balance, page: 1 };
  res.status(201).json(result);
};

module.exports = addTransaction;
