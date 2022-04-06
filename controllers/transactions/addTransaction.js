const { Transaction, User } = require('../../models');

const addTransaction = async (req, res) => {
  const { _id } = req.user;
  const { amount, type } = req.body;

  const user = await User.findById(_id);

  user.setBalance(type ? user.balance + amount : user.balance - amount).save();

  res.status(201).json(
    await Transaction.create({
      ...req.body,
      owner: _id,
      balance: user.balance,
    }),
  );
};

module.exports = addTransaction;
