const { BadRequest } = require('http-errors');
const { Transaction, User } = require('../../models');
const { formatDate } = require('./formatDate');

const addTransaction = async (req, res) => {
  const { _id } = req.user;
  const { amount, type } = req.body;
  const limit = 8;

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

  const transactions = formatDate(
    await Transaction.find({ owner: _id }, { owner: 0 }, { limit }).sort({
      createdAt: -1,
    }),
  );

  const totalPages = Math.ceil(user.totalTransactions / limit);

  res.status(201).json({ transactions, balance: user.balance, page: 1, totalPages });
};

module.exports = addTransaction;
