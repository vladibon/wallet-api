const { BadRequest } = require('http-errors');
const { Transaction, User } = require('../../models');
const { formatDate } = require('./formatDate');

const addTransaction = async (req, res) => {
  const { _id } = req.user;
  const { amount, type } = req.body;
  const limit = 8;

  const user = await User.findById(_id);

  const balanceCheck = type ? user.balance + Number(amount) : user.balance - Number(amount);

  if (balanceCheck < 0) throw new BadRequest('Balance cannot be negative');

  await Transaction.create({
    ...req.body,
    owner: _id,
    balance: user.balance,
  });

  let balance = 0;

  user.incrementTotalTransactions().save();

  const transactions = await Transaction.find({ owner: _id });

  const sortedTransaction = transactions.slice().sort((a, b) => {
    const at = a.date.getTime();
    const bt = b.date.getTime();

    return at - bt;
  });

  for (let i = 0; i < sortedTransaction.length; i++) {
    if (sortedTransaction[i].type) {
      balance += sortedTransaction[i].amount;
    }

    if (!sortedTransaction[i].type) {
      balance -= sortedTransaction[i].amount;
    }

    await Transaction.findByIdAndUpdate(sortedTransaction[i]._id, { balance });
  }

  await User.findByIdAndUpdate(_id, { balance: Math.round(balance * 100) / 100 });

  const totalPages = Math.ceil(user.totalTransactions / limit);

  const formatedTransactions = formatDate(transactions);

  res.status(201).json({ transactions: formatedTransactions, balance, page: 1, totalPages });
};

module.exports = addTransaction;
