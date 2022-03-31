const { NotFound, BadRequest } = require('http-errors');
const { User } = require('../../models');
const sendEmail = require('../../services/sendEmail');

const repeatVerify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) throw new NotFound('User not found');
  if (user.verify) throw new BadRequest('Verification has already been passed');

  await sendEmail(email, user.verificationToken);

  res.json({ message: 'Verification email sent' });
};

module.exports = repeatVerify;
