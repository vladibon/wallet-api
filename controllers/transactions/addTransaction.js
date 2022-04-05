const { Transaction } = require('../../models');

const addTransaction = async (req, res) => {
  const { _id } = req.user;

  const data = await Transaction.find({ owner: _id });
  const sortedData = [...data].sort((a, b) => b.updatedAt - a.updatedAt);

  const { amount, type } = req.body;
  if (data.length === 0) {
    sortedData.push({ balance: 0 });
  }
  const balance = type ? sortedData[0].balance + amount : sortedData[0].balance - amount;

  res.status(201).json(await Transaction.create({ ...req.body, owner: _id, balance }));
};

module.exports = addTransaction;
