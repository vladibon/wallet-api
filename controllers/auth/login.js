const { Unauthorized } = require('http-errors');
const { User } = require('../../models');

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user?.comparePassword(password))
    throw new Unauthorized(`Email or password is wrong`);

  user.setToken().save();

  res.json({
    token: user.token,
    user: {
      email: user.email,
      name: user.name,
      balance: user.balance,
      categories: user.categories,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
      signupDate: user.createdAt,
    },
  });
};

module.exports = login;
