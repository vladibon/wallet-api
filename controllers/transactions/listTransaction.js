const { BadRequest } = require('http-errors');
const { Transaction } = require('../../models');

const listTransaction = async (req, res) => {
  const { _id } = req.user;
  const { page = 1, limit = 8 } = req.query;

  if (page < 1 || limit < 1) throw new BadRequest('Page and limit must be positive');

  const filter = { owner: _id };

  const skip = (page - 1) * limit;

  res.json(await Transaction.find(filter, '', { skip, limit }).populate('owner', 'email'));
};

module.exports = listTransaction;
