const { Unauthorized } = require("http-errors");
const { User } = require("../../models");

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user || !user?.comparePassword(password))
    throw new Unauthorized(`Email or password is wrong`);

  // if (!user.verify) throw new Unauthorized('Email verification is required ');

  user.setToken().save();

  res.json({
    token: user.token,
    user: {
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

module.exports = login;
