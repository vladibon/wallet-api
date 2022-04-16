const { BadRequest } = require('http-errors');
const { Transaction, User } = require('../../models');

const addTransaction = async (req, res) => {
  const { _id } = req.user;
  const { date, type, amount } = req.body;
  const limit = 8;

  const user = await User.findById(_id);

  let balance = type ? user.balance + Number(amount) : user.balance - Number(amount);

  if (balance < 0) throw new BadRequest('Balance cannot be negative');

  user
    .setBalance(Math.round(balance * 100) / 100)
    .incrementTotalTransactions()
    .save();

  await Transaction.create({ ...req.body, owner: _id });

  const nextTransactions = await Transaction.find({ owner: _id, date: { $gte: date } }).sort({
    date: -1,
    createdAt: -1,
  });

  for (let i = 0; i < nextTransactions.length; i += 1) {
    await Transaction.findByIdAndUpdate(nextTransactions[i]._id, { balance });

    nextTransactions[i].type
      ? (balance -= nextTransactions[i].amount)
      : (balance += nextTransactions[i].amount);
  }

  const transactions = await Transaction.find({ owner: _id }, { owner: 0 }, { limit }).sort({
    date: -1,
    createdAt: -1,
  });

  const totalPages = Math.ceil(user.totalTransactions / limit);

  res.status(201).json({ transactions, balance: user.balance, page: 1, totalPages });
};

module.exports = addTransaction;
