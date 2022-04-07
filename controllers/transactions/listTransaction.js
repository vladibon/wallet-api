const { BadRequest } = require('http-errors');
const { Transaction } = require('../../models');

const listTransaction = async (req, res) => {
  const { _id, balance } = req.user;
  const { page = 1, limit = 8 } = req.query;

  if (page < 1 || limit < 1) throw new BadRequest('Page and limit must be positive');

  const filter = { owner: _id };
  const skip = (page - 1) * limit;

  const transactions = await Transaction.find(filter, { owner: 0 }, { skip, limit }).sort({
    createdAt: -1,
  });

  res.json({ transactions, balance, page });
};

module.exports = listTransaction;
