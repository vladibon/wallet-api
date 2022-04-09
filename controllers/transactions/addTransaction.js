const { BadRequest } = require('http-errors');
const { Transaction, User } = require('../../models');

const addTransaction = async (req, res) => {
  const { _id } = req.user;
  const { amount, type } = req.body;

  const user = await User.findById(_id);

  const balance = type ? user.balance + Number(amount) : user.balance - Number(amount);

  if (balance < 0) throw new BadRequest('Balance cannot be negative');

  user
    .setBalance(Math.round(balance * 100) / 100)
    .incrementTotalTransactions()
    .save();

  await Transaction.create({
    ...req.body,
    owner: _id,
    balance: user.balance,
  });

  const transactions = await Transaction.find({ owner: _id }, { owner: 0 }, { limit: 8 }).sort({
    createdAt: -1,
  });

  res.status(201).json({ transactions, balance: user.balance, page: 1 });
};

module.exports = addTransaction;
