const moment = require('moment');
const { Transaction } = require('../../models');

const statsTransaction = async (req, res) => {
  const { _id, createdAt } = req.user;
  const { year, month } = req.query;

  const startDate = moment.utc([year, month]).toDate();
  const endDate = moment(startDate).endOf('month').toDate();

  const aggregateTransactions = async type => {
    const transactions = await Transaction.aggregate([
      {
        $match: {
          owner: _id,
          type,
          date: {
            $gte: startDate,
            $lte: endDate,
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
        $project: {
          _id: 0,
          category: '$_id.category',
          sum: '$sum',
        },
      },
    ]);

    const totalSum = transactions
      .reduce((total, cat) => {
        cat.sum = Number(cat.sum).toFixed(2);

        return total + Number(cat.sum);
      }, 0)
      .toFixed(2);

    return [transactions, totalSum];
  };

  const [income, totalIncome] = await aggregateTransactions(true);
  const [expense, totalExpenses] = await aggregateTransactions(false);
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
