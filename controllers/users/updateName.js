const { User } = require('../../models');

const updateName = async (req, res) => {
  const { _id } = req.user;
  const { name } = req.body;

  const updatedUser = await User.findByIdAndUpdate(_id, { name: name.trim() }, { new: true });

  res.status(200).json({
    message: 'User name updated successfully',
    name: updatedUser.name,
  });
};

module.exports = updateName;
