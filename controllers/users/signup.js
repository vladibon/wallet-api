const { Conflict } = require('http-errors');
const { User } = require('../../models');

const signup = async (req, res) => {
  const { email, password, name } = req.body;

  if (await User.findOne({ email })) throw new Conflict(`User with email:${email} already exist`);

  const user = await new User({ email }).setPassword(password).setName(name).setToken().save();

  res.status(201).json({
    token: user.token,
    user: {
      email: user.email,
      name: user.name,
      balance: user.balance,
    },
  });
};

module.exports = signup;
