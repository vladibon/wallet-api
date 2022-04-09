const { Transaction } = require('../../models');

const statsTransaction = async (req, res) => {
  const { _id } = req.user;
  const { month, year } = req.body;

  const income = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        type: true,
        date: {
          $gte: new Date(`${month}/1/${year}`),
          $lte: new Date(`${month}/31/${year}`),
        },
      },
    },
    {
      $group: {
        _id: { category: '$category' },
        sum: { $sum: '$amount' },
      },
    },
    {
      $project: { _id: 0, category: '$_id.category', sum: '$sum' },
    },
  ]);

  const expense = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        type: false,
        date: {
          $gte: new Date(`${month}/1/${year}`),
          $lte: new Date(`${month}/31/${year}`),
        },
      },
    },
    {
      $group: {
        _id: { category: '$category' },
        sum: { $sum: '$amount' },
      },
    },
    {
      $project: { _id: 0, category: '$_id.category', sum: '$sum' },
    },
  ]);

  const totalIncome = income.reduce((acc, { sum }) => acc + sum, 0);
  const totalExpenses = expense.reduce((acc, { sum }) => acc + sum, 0);

  res.json({ income, expense, totalIncome, totalExpenses });
};

module.exports = statsTransaction;
