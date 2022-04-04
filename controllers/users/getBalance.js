const { Transaction } = require('../../models');

const getBalance = async (req, res) => {
  const { _id, email, name } = req.user;
  const data = await Transaction.find({ owner: _id });
  const sortedData = [...data].sort((a, b) => b.updatedAt - a.updatedAt);
  if (data.length === 0) {
    sortedData.push({ balance: 0 });
  }
  const balance = sortedData[0].balance;

  res.json({ email, name, balance });
};

module.exports = getBalance;
