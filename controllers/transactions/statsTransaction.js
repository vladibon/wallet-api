const { Transaction } = require('../../models');

const statsTransaction = async (req, res) => {
  const { _id, createdAt } = req.user;
  const { month, year } = req.query;

  const incomeR = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        type: true,
        date: {
          $gte: new Date(`${Number(month) + 1}/1/${year}`),
          $lt: new Date(`${Number(month) + 2}/1/${year}`),
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

  const expenseR = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        type: false,
        date: {
          $gte: new Date(`${Number(month) + 1}/1/${year}`),
          $lt: new Date(`${Number(month) + 2}/1/${year}`),
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

  const totalIncome = incomeR.reduce((acc, { sum }) => acc + sum, 0).toFixed(2);
  const totalExpenses = expenseR.reduce((acc, { sum }) => acc + sum, 0).toFixed(2);

  const income = incomeR.map(sec => {
    sec.sum = Number(sec.sum).toFixed(2);
    return sec;
  });

  const expense = expenseR.map(sec => {
    sec.sum = Number(sec.sum).toFixed(2);
    return sec;
  });

  const [firstTransaction] = await Transaction.find({ owner: _id }).sort({ date: 1 }).limit(1);

  res.json({
    income,
    expense,
    totalIncome,
    totalExpenses,
    firstTransactionDate: firstTransaction?.date || createdAt,
  });
};

module.exports = statsTransaction;
