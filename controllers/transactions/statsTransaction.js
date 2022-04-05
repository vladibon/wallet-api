const { Transaction } = require('../../models');

const statsTransaction = async (req, res) => {
  const { _id } = req.user;
  const { begin, end } = req.body;

  const result = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        type: true,
        date: {
          $gte: new Date(begin), // тут указываете с какого числа месяца
          $lte: new Date(end), // по какое число месяца.
        },
      },
    },
    {
      $group: {
        _id: { category: '$category' },
        totalSum: { $sum: '$amount' },
      },
    },
    {
      $project: { _id: 0, category: '$_id.category', totalSum: '$totalSum' },
    },
  ]);

  res.json(result);
};

module.exports = statsTransaction;
