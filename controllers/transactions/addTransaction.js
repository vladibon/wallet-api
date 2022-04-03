const { Transaction } = require('../../models');

const addTransaction = async (req, res) => {
  const { _id } = req.user;

  res.status(201).json(await Transaction.create({ ...req.body, owner: _id }));
};

module.exports = addTransaction;
