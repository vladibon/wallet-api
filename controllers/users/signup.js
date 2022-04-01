const { Conflict } = require('http-errors');
const { User } = require('../../models');
// const sendEmail = require('../../services/sendEmail');

const signup = async (req, res) => {
  const { email, password, name } = req.body;

  if (await User.findOne({ email })) throw new Conflict(`User with email:${email} already exist`);

  const user = await new User({ email })
    .setPassword(password)
    .setVerificationToken()
    .setName(name)
    .save();

  // await sendEmail(email, user.verificationToken);

  res.status(201).json({
    user: {
      email: user.email,
      name: user.name,
    },
  });
};

module.exports = signup;
