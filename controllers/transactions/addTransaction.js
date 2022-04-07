const { Transaction, User } = require('../../models');

const addTransaction = async (req, res) => {
  const { _id } = req.user;
  const { amount, type } = req.body;

  const user = await User.findById(_id);

  const balance = type ? user.balance + amount : user.balance - amount;

  if (balance < 0) {
    res.status(400).json({ message: 'Balance cannot be below zero' });
  } else {
    user.setBalance(Math.round(balance * 100) / 100).save();
    await Transaction.create({
      ...req.body,
      owner: _id,
      balance: user.balance,
    });

    const skip = 0;
    const limit = 8;
    const transactions = await Transaction.find({ owner: _id }, { owner: 0 }, { skip, limit }).sort(
      {
        createdAt: -1,
      },
    );
    const result = { transactions, balance: user.balance, page: 1 };
    res.status(201).json(result);
  }
};

module.exports = addTransaction;
