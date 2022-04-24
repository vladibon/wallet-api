const { BadRequest } = require('http-errors');
const { Transaction } = require('../../models');

const listTransactions = async (req, res) => {
  const { _id, balance, totalTransactions } = req.user;
  const { page = 1, limit = 12 } = req.query;

  if (page < 1 || limit < 1) throw new BadRequest('Page and limit must be positive');

  const skip = (page - 1) * limit;

  const transactions = await Transaction.find({ owner: _id }, { owner: 0 }, { skip, limit }).sort({
    date: -1,
    createdAt: -1,
  });

  const totalPages = Math.ceil(totalTransactions / limit);

  res.json({
    transactions,
    balance,
    page: Number(page),
    totalPages,
  });
};

module.exports = listTransactions;
