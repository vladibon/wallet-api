const { Transaction } = require('../../models');

const statsTransaction = async (req, res) => {
  const { _id } = req.user;
  const { month, year } = req.query;

  const incomeResponse = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        type: true,
        date: {
          $gte: new Date(`${Number(month) + 1}/1/${year}`),
          $lte: new Date(`${Number(month) + 1}/31/${year}`),
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

  const expenseResponse = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        type: false,
        date: {
          $gte: new Date(`${Number(month) + 1}/1/${year}`),
          $lte: new Date(`${Number(month) + 1}/31/${year}`),
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

  const totalIncome = incomeResponse.reduce(
    (acc, { sum }) =>
      (Math.round((Number(acc) + Number(sum) + Number.EPSILON) * 100) / 100).toFixed(2),
    0,
  );
  const totalExpenses = expenseResponse.reduce((acc, { sum }) => {
    console.log(acc);
    return (Math.round((Number(acc) + Number(sum) + Number.EPSILON) * 100) / 100).toFixed(2);
  }, 0);

  const income = incomeResponse.map(stat => {
    stat.sum = (Math.round((Number(stat.sum) + Number.EPSILON) * 100) / 100).toFixed(2);
    return stat;
  });
  const expense = expenseResponse.map(stat => {
    stat.sum = (Math.round((Number(stat.sum) + Number.EPSILON) * 100) / 100).toFixed(2);
    return stat;
  });

  res.json({ income, expense, totalIncome, totalExpenses });
};

module.exports = statsTransaction;
