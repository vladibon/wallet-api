const { User } = require('../../models');

const updateEmail = async (req, res) => {
  const { _id } = req.user;
  const { email } = req.body;

  const updatedUser = await User.findByIdAndUpdate(_id, { email }, { new: true });

  res.status(200).json({
    message: 'Email updated successfully',
    email: updatedUser.email,
  });
};

module.exports = updateEmail;
