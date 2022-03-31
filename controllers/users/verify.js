const { NotFound } = require('http-errors');
const { User } = require('../../models');

const verify = async (req, res) => {
  const { verificationToken } = req.params;

  const user = await User.findOne({ verificationToken });

  if (!user) throw new NotFound('User not found');

  user.verifyEmail().save();

  res.json({ message: 'Verification successful' });
};

module.exports = verify;
